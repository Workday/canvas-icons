import {createGithubClient} from './apiClient';

// First commit of canvas-icons, used as fallback base when no prior release tag exists
const INITIAL_COMMIT = '9a4acd5';

type PRInfoOptions = {
  owner: string;
  repo: string;
  scope: string;
  fromRef: string;
  token: string;
};

export const getPullRequests = async (options: PRInfoOptions) => {
  const {owner, repo, scope, fromRef, token} = options;
  const client = createGithubClient({token, owner, repo});
  const isRefExisting = await client.checkRefExists(fromRef);

  const commits = await client.getCommits({
    base: isRefExisting ? fromRef : INITIAL_COMMIT,
    head: 'main',
  });

  const packageReleaseCommits = commits
    .filter(({commit, author}: any) => {
      if (
        author?.login === 'dependabot[bot]' ||
        commit.message.startsWith('Merge') ||
        commit.message.startsWith('chore: Merge') ||
        commit.message.startsWith('chore: Release')
      ) {
        return false;
      }

      return commit.message.includes(`(${scope})`);
    })
    .reverse();

  const commitsWithPRs = packageReleaseCommits.filter(({commit}: any) =>
    /(#\d+)/.test(commit.message)
  );

  const commitsWithoutPRs = packageReleaseCommits
    .filter(({commit}: any) => !/(#\d+)/.test(commit.message))
    .map(({commit}: any) => commit.message);

  const prNumbers = commitsWithPRs.map(({commit}: any) => {
    const [firstMsg] = commit.message.split('\n\n');
    return firstMsg.replace(/.*\(#(\d+)\)/, (_: string, b: string) => b);
  });

  return {
    prs: await Promise.all(
      prNumbers.map((number: string) => client.getPullRequestInfo(parseInt(number, 10)))
    ),
    commits: commitsWithoutPRs,
  };
};

import {getOctokit} from '@actions/github';

type ClientOptions = {
  token: string;
  owner: string;
  repo: string;
};

export const createGithubClient = ({token, owner, repo}: ClientOptions) => {
  const octokit = getOctokit(token);

  return {
    async getCommits({base, head}: {base: string; head: string}) {
      return octokit.rest.repos
        .compareCommitsWithBasehead({
          owner,
          repo,
          basehead: `${base}...${head}`,
          per_page: 100,
        })
        .then(r => r.data.commits)
        .catch(() => {
          throw new Error(
            `Could not find either "${head}" or "${base}" refs in git. Check that these refs exist and try again.`
          );
        });
    },

    async getPullRequestInfo(number: number) {
      return octokit.rest.pulls
        .get({
          owner,
          repo,
          pull_number: number,
        })
        .then(r => ({
          number: r.data.number,
          title: r.data.title,
          body: r.data.body,
          url: r.data.html_url,
          user: {login: r.data.user?.login, url: r.data.user?.html_url},
        }))
        .catch(() => {
          throw new Error(
            `Could not find PR #${number} in git. Check that pull request exists and try again.`
          );
        });
    },

    async checkRefExists(ref: string) {
      return octokit.rest.git
        .getRef({
          owner,
          repo,
          ref: `tags/${ref}`,
        })
        .then(r => !!r.data)
        .catch(() => false);
    },
  };
};

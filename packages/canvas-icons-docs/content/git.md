# Git & Github

```sh
# clone the repo
git clone https://github.com/Workday/canvas-icons.git
# install dependencies
yarn install
```

## Creating an Issue

If you find something you'd like added, feel free to
[create an issue](https://github.com/Workday/canvas-icons/issues/new/choose), but please be sure to
[review existing issues](https://github.com/Workday/canvas-icons/issues) first to reduce duplicates.

## Git Guidelines

### Branches

- Create branches for each feature you develop
- Branch names should start with an issue number and be a description of the feature being
  implemented/bug being fixed
- Prefer dashes over camelCasing in branch names.

Example:

```sh
git checkout -b ISSUE-51_add-ci-release-step
```

#### Major Branches

- `main` – Holds current stable releases.
- `gh-pages` – Branch for deployed documentation.

#### Pre-release Branches

These branches organize changes for upcoming minor and major releases by icon type.

TODO: Add branch info.

### Commit Message Format

Canvas Icons relies on the
[conventional-commit format specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification).
By formalizing our commit message format, this allows us to easily generate changelogs and scan
through the commit history.

#### Commit Descriptions

> **Examples**

```
chore: Add alpha release stage to Jenkins
fix(graphics-web): Update graphics project settings
```

> **DO**

- Use the commit scope if your change is specific to a package
- When in doubt, leave scope out
- Capitalize your description
- Explain the additions/edits/fixes made in your staged changes. If you cannot describe it within
  ~50 characters, you should be breaking it into multiple commits
- Use the imperative mood (e.g. "fix", not "fixed")
- Start with a verb
- If you have similar/identical commits one after another, consider using `--amend` or squashing.

> **DON'T**

- Don't use generic messages (e.g. "fix: Clean up code", "fix: Address review feedback", etc.)
- Don't describe the problem that was being solved (e.g. "fix: State was broken")
- Don't be too brief. Avoid one word descriptions. Anyone with context should have a good idea of
  what your commit does without having to look at it.
- Don't end with a period

## Submitting a Pull Request

After committing your changes, you can push them up and create a pull request. You can either create
a PR in [GitHub's UI](https://github.com/Workday/canvas-icons/pulls) or
[the `gh` CLI](https://cli.github.com/manual/gh_pr_create). When creating a PR, please allow edits
by maintainers, so we can add small nits and suggestions as we review.

```sh
gh pr create
```

If you'd like early feedback, please create a draft PR. And when you're ready for review, add a
`ready for review` label. We triage open pull requests daily and assign owners to ensure they move
along in a timely manner. Once the CI checks pass and changes are approved, we'll merge your branch
and create a new release, if needed.

Please follow the provided pull request template. The Issue section connects the pull request to the
associated issue. The Summary and Release Category sections are used by our release automation to
generate our changelog. All other sections below are intended for the reviewer and help the review
process move along smoothly.

## Releases

- Releases are prepared by updating package versions with `changeset version`, and updating package
  changelogs.
- All releases are handled by the Release GitHub Action.
- Patch releases are initiated by commits with no feature type, e.g. `docs`, `fix`, `test`, etc.,
  merged into the `main` branch.
- Major releases should be done manually by running the GitHub workflow.

TODO: Add rest of release info.

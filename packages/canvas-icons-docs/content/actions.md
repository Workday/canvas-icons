# GitHub Actions Workflows

This repository uses several GitHub Actions to automate the deployment and release processes. Below
are the descriptions of the workflows and their triggers.

---

## Deploy GH Pages

#### Description:

This workflow automates the deployment of the GitHub Pages site whenever changes are pushed to the
`main` branch.

#### Trigger:

This workflow is triggered by a `push` event to the `main` branch.

---

## Pull Request Check

#### Description:

This workflow runs checks when a pull request is created, ensuring code quality and consistency
before merging.

#### Trigger:

This workflow is triggered on any pull request (`pull_request` event).

#### Checks:

- **Build:** Check the build processes to ensure that the project compiles correctly.
- **Unit tests:** Run unit tests to verify that the code works as expected.
- **Cypress:** Run Cypress tests to validate the functionality on both the baseline and current
  branch. Skipped if changed files doesn't have any svgs changed or PR has label `cy:approved` to
  accept branch changes.

---

## Release

#### Description:

The Release workflow manages publishing packages for different platforms and handles both stable and
pre-releases.

- **Web Release:** Publishes web packages to `npm`. Triggered by:
  - A commit with changes to web packages pushed to the `main` branch

- **Minor and Major:** Minor and major releases made manually will pull changes from:
  - `preminor/*/*` → `main` for minor
  - `premajor/*/*` → `main` for major

- **Pre-releases:** Automatically triggered when changes are pushed to:
  - `preminor/*/*` for **beta** (upcoming minor release)
  - `premajor/*/*` for **alpha** (upcoming major release)

#### Trigger:

- Automatically triggered by `push` to `main`, `preminor/*/*`, or `premajor/*/*`
- Can also be manually triggered via the GitHub UI, requiring inputs: `scope`, `platform`, and
  `version`

---

These workflows help streamline the deployment and release process, ensuring consistency and
reducing manual effort.

/**
 * Determine which icon packages should be released and at what version.
 *
 * Reads release context from environment variables and writes outputs to the
 * GitHub Actions $GITHUB_OUTPUT file (when present). The outputs drive the
 * conditional `do-release` steps in `.github/workflows/release.yml`.
 *
 * Inputs (via process.env):
 *   - EVENT_NAME:    GitHub event that triggered the workflow
 *                    ("push" | "workflow_dispatch").
 *   - BRANCH:        Branch name (github.ref_name).
 *   - HEAD_COMMIT:   Subject line of the head commit (push only).
 *   - CHANGED_FILES: Space-separated list of files changed in the head commit
 *                    (push to main, when scope is not in the commit message).
 *   - VERSION:       Manual dispatch input: "patch" | "minor" | "major".
 *   - PACKAGE:       Manual dispatch input: "all" | "system" | "expressive".
 *
 * Outputs (written to $GITHUB_OUTPUT):
 *   - system-version:     "" | "patch" | "minor" | "major"
 *   - expressive-version: "" | "patch" | "minor" | "major"
 *   - preid:              "" | "beta" | "alpha"
 *   - prerelease:         "true" | "false"
 */

const fs = require('fs');

const {
  EVENT_NAME = '',
  BRANCH = '',
  HEAD_COMMIT = '',
  CHANGED_FILES = '',
  VERSION = '',
  PACKAGE = '',
} = process.env;

const SCOPES = {SYSTEM: 'system', EXPRESSIVE: 'expressive', ALL: 'all'};

// preminor/<scope> or premajor/<scope>
const prereleaseBranchPattern = /^pre(?<bump>minor|major)\/(?<scope>system|expressive|all)$/;
// Conventional commit: type(scope)?: subject
const commitPattern = /^(?<type>\w+)(?:\((?<scope>[^()]+)\))?!?:/;

// File path patterns used when a commit on main has no explicit scope.
// `nx-plugin` is shared infrastructure and forces both packages to release.
const filePatterns = {
  shared: [/(?:^|\/)nx-plugin\//],
  system: [
    /(?:^|\/)canvas-system-icons-web\//,
    /(?:^|\/)canvas-icons\/src\/system\//,
    /(?:^|\/)canvas-system-icons-web\//,
    /(?:^|\/)system\.metadata\.json$/,
    /(?:^|\/)system\.deprecated\.metadata\.json$/,
  ],
  expressive: [
    /(?:^|\/)canvas-expressive-icons-web\//,
    /(?:^|\/)canvas-icons\/src\/expressive\//,
    /(?:^|\/)canvas-expressive-icons-web\//,
    /(?:^|\/)expressive\.metadata\.json$/,
    /(?:^|\/)expressive\.deprecated\.metadata\.json$/,
  ],
};

function matchesAny(file, patterns) {
  return patterns.some(re => re.test(file));
}

/**
 * Map a commit scope or manual-dispatch package input to the affected packages.
 * Returns an object `{system, expressive}` of booleans.
 */
function scopeToPackages(scope) {
  if (scope === SCOPES.ALL) return {system: true, expressive: true};
  if (scope === SCOPES.SYSTEM) return {system: true, expressive: false};
  if (scope === SCOPES.EXPRESSIVE) return {system: false, expressive: true};
  return {system: false, expressive: false};
}

/**
 * Inspect changed files and decide which packages should be released.
 * A change under `nx-plugin/` short-circuits and selects both.
 */
function packagesFromChangedFiles(changedFiles) {
  const files = changedFiles.split(/\s+/).filter(Boolean);
  const selection = {system: false, expressive: false};

  for (const file of files) {
    if (matchesAny(file, filePatterns.shared)) {
      return {system: true, expressive: true};
    }
    if (matchesAny(file, filePatterns.system)) selection.system = true;
    if (matchesAny(file, filePatterns.expressive)) selection.expressive = true;
  }

  return selection;
}

/**
 * Translate a conventional commit type into a semver bump kind, or `""` when
 * the type should not trigger a release.
 */
function commitTypeToBump(type) {
  if (type === 'feat') return 'minor';
  if (type === 'fix') return 'patch';
  return '';
}

function resolveRelease() {
  // Manual dispatch: trust the workflow inputs verbatim.
  if (EVENT_NAME === 'workflow_dispatch') {
    if (!VERSION) return null;
    const selection = scopeToPackages(PACKAGE || SCOPES.ALL);
    return {
      systemVersion: selection.system ? VERSION : '',
      expressiveVersion: selection.expressive ? VERSION : '',
      preid: '',
      prerelease: false,
    };
  }

  // Push to a prerelease branch: bump and scope are encoded in the branch.
  const prereleaseMatch = prereleaseBranchPattern.exec(BRANCH);
  if (prereleaseMatch && prereleaseMatch.groups) {
    const {bump, scope} = prereleaseMatch.groups;
    const selection = scopeToPackages(scope);
    return {
      systemVersion: selection.system ? bump : '',
      expressiveVersion: selection.expressive ? bump : '',
      preid: bump === 'major' ? 'alpha' : 'beta',
      prerelease: true,
    };
  }

  // Push to main: derive bump from commit type and packages from commit scope
  // or, when no scope is given, the set of changed files.
  if (BRANCH === 'main') {
    const commitMatch = commitPattern.exec(HEAD_COMMIT);
    if (!commitMatch || !commitMatch.groups) return null;

    const {type, scope} = commitMatch.groups;
    const bump = commitTypeToBump(type);
    if (!bump) return null;

    let selection;
    if (scope === SCOPES.SYSTEM || scope === SCOPES.EXPRESSIVE || scope === SCOPES.ALL) {
      selection = scopeToPackages(scope);
    } else {
      // No (or unrecognized) scope -> infer from changed files.
      selection = packagesFromChangedFiles(CHANGED_FILES);
    }

    return {
      systemVersion: selection.system ? bump : '',
      expressiveVersion: selection.expressive ? bump : '',
      preid: '',
      prerelease: false,
    };
  }

  return null;
}

function writeOutput(name, value) {
  const line = `${name}=${value}`;
  console.log(line);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${line}\n`);
  }
}

function emit({systemVersion = '', expressiveVersion = '', preid = '', prerelease = false} = {}) {
  writeOutput('system-version', systemVersion);
  writeOutput('expressive-version', expressiveVersion);

  if (preid) {
    writeOutput('preid', preid);
  }

  if (prerelease) {
    writeOutput('prerelease', 'true');
  }

  if (!systemVersion && !expressiveVersion) {
    console.log('No packages found to release');
  }
}

emit(resolveRelease() || {});

module.exports = {resolveRelease};

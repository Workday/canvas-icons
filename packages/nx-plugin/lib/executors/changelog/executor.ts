import fs from 'fs';
import path from 'path';

import {PromiseExecutor} from '@nx/devkit';
import {MetadataExecutorSchema} from './schema';

const runExecutor: PromiseExecutor<MetadataExecutorSchema> = async options => {
  const {scope, packageName, commit} = options;

  console.log(`Recieved the commit message:\n${commit}`);

  const rootDir = process.cwd();

  // extract commit type to specify a version:
  // feat, fix, test, chore, etc...
  const commitType = commit.match(/^\w+/)?.[0];

  if (!scope) {
    // skip if commit is not related to any package
    console.log(
      "Head commit doesn't have specified package for release. Changelog generation has been skipped!"
    );
    return {
      success: true,
    };
  }

  const fullPackageName = `@workday/${packageName}`;

  // extract version for release: e.g. major
  const inputVersion = commit.match(/\[(major|minor|patch)\]/)?.[1];
  console.log(`The version has been entered: ${inputVersion}`);

  const versionByCommit = commitType === 'feat' ? 'minor' : 'patch';
  const version = inputVersion || versionByCommit;
  console.log(`The changelog version has been defined: ${version}`);

  const releaseNotes = '';

  console.log(`The changelog release notes have been generated:\n\n${releaseNotes}`);

  const header = `---\n'${fullPackageName}': ${version}\n---`;

  console.log(`The changelog header has been generated:\n${header}`);

  // Create pre-changelog doc for changeset versioning
  fs.writeFileSync(
    path.join(rootDir, './.changeset/pre-changelog.md'),
    `${header}\n\n${releaseNotes}`,
    'utf8'
  );

  return {
    success: true,
  };
};

export default runExecutor;

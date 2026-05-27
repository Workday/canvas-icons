import {PromiseExecutor} from '@nx/devkit';
import fs from 'fs';
import path from 'path';

import {getJSONContent, getSvgContent, getTypesContent, toCamelCase} from '../../utils';
import {MetadataExecutorSchema} from './schema';

const types = {
  system: 'System',
  expressive: 'Expressive',
};

const getModuleContent = (
  moduleType: 'es6' | 'commonjs',
  name: string,
  stringifiedValue: string,
  deprecatedContent?: string
) => {
  if (moduleType === 'es6') {
    return `import {CanvasIconTypes} from "./types";\n\n${deprecatedContent}export const ${name} = ${stringifiedValue};`;
  }

  if (moduleType === 'commonjs') {
    return `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\nconst {CanvasIconTypes} = require("./types");\n\n${deprecatedContent}exports.${name} = ${stringifiedValue};`;
  }

  return '';
};

const getExportContent = (
  moduleType: 'es6' | 'commonjs',
  iconNames: string[],
  iconType: string,
  moduleDir: string
) => {
  const endName = iconType === 'graphics' ? 'Graphic' : 'Icon';
  const folderFiles = fs
    .readdirSync(moduleDir)
    .filter(file => file.endsWith('.js') && file !== 'index.js');

  if (moduleType === 'es6') {
    const typesExports = `export {CanvasIconTypes} from './types';\n\n`;
    const iconsExports = iconNames
      .map(name => {
        const iconFileName = folderFiles.find(file => file === `${name}.js`)?.replace('.js', '');
        return iconFileName
          ? `export {${toCamelCase(name)}${endName}} from "./${iconFileName}";`
          : '';
      })
      .join('\n');

    return typesExports + iconsExports;
  }

  if (moduleType === 'commonjs') {
    const header = `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`;
    const iconsExports = iconNames
      .map(name => {
        const varName = `${toCamelCase(name)}${endName}`;
        return `var {${varName}} = require("./${name}");\nexports.${varName} = ${varName};`;
      })
      .join('\n');

    return (
      header +
      `var {CanvasIconTypes} = require("./types");\nexports.CanvasIconTypes = CanvasIconTypes;\n\n` +
      iconsExports
    );
  }

  return '';
};

const runExecutor: PromiseExecutor<MetadataExecutorSchema> = async options => {
  const {iconType, moduleType} = options;
  const type = types[iconType as keyof typeof types];
  const iconTypeDeclaration = `Canvas${type}Icon`;

  const packageRoot = process.cwd();
  const packageDistDir = path.join(packageRoot, 'dist');

  const iconDir = path.join(packageDistDir, 'svg');
  const moduleDir = path.join(packageDistDir, moduleType);

  const basePackageDir = '../canvas-icons';

  const metadataPaths = fs
    .readdirSync(path.resolve(packageRoot, basePackageDir))
    .filter(value => value.startsWith(iconType) && value.endsWith('metadata.json'));

  const metadata = metadataPaths.reduce((acc: object[], filename) => {
    const metadataPath = path.resolve(packageRoot, basePackageDir, filename);
    const data = getJSONContent(metadataPath);

    return Array.isArray(data) ? [...acc, ...data] : acc;
  }, []);

  const icons = fs.readdirSync(iconDir).filter(file => /.svg$/.test(file));

  const missingIcons = icons.filter(icon => !metadata.some(({filename}) => filename === icon));

  if (missingIcons.length) {
    console.log('No metadata found for some icon files:', missingIcons.join(','));
    return {
      success: false,
    };
  }

  icons.forEach((icon: string) => {
    const iconMetadata = metadata.find((meta: any) => meta.filename === icon);
    const iconFilePath = path.resolve(iconDir, icon);

    const camelizedName = toCamelCase(iconMetadata.name);

    fs.mkdirSync(moduleDir, {recursive: true});

    const svg = getSvgContent(iconFilePath);
    const isDeprecated = iconMetadata.deprecated;
    const fallback = isDeprecated ? iconMetadata.fallback : undefined;

    const iconObject = {
      name: iconMetadata.name,
      type: `CanvasIconTypes.${type}`,
      svg,
      filename: iconMetadata.filename,
      category: !iconMetadata.deprecated ? iconMetadata.category : 'Deprecated',
      tags: iconMetadata.tags,
      fallback,
    };

    const fallbackName = fallback?.replace(/^wd-icon-(.*)\.svg$/, '$1');

    const deprecatedContent = fallback
      ? `/** @deprecated Use \`${toCamelCase(fallbackName)}Icon\` instead */\n`
      : '';

    const data = JSON.stringify(iconObject, null, '\t').replaceAll(
      `"CanvasIconTypes.${type}"`,
      `CanvasIconTypes.${type}`
    );

    const typeContent = `import {${iconTypeDeclaration}} from "./types";\n\n${deprecatedContent}export declare const ${camelizedName}Icon: ${iconTypeDeclaration};`;
    const content = getModuleContent(moduleType, `${camelizedName}Icon`, data, deprecatedContent);

    fs.writeFileSync(path.resolve(moduleDir, `${iconMetadata.name}.js`), content);
    fs.writeFileSync(path.resolve(moduleDir, `${iconMetadata.name}.d.ts`), typeContent);
  });

  const iconNames: string[] = icons.map(icon => {
    const {name} = metadata.find(
      (meta: {filename: string; name: string}) => meta.filename === icon
    )!;
    return name;
  });
  const exportsContent = getExportContent(moduleType, iconNames, iconType, moduleDir);

  const mainTsContent = getExportContent('es6', iconNames, iconType, moduleDir).replace(
    `export {CanvasIconTypes} from './types';`,
    `export {CanvasIconTypes, ${iconTypeDeclaration}} from './types';`
  );

  fs.writeFileSync(path.resolve(moduleDir, 'index.js'), exportsContent);
  fs.writeFileSync(path.resolve(moduleDir, 'index.d.ts'), mainTsContent);
  fs.writeFileSync(path.resolve(moduleDir, 'types.js'), getTypesContent(moduleType, type));
  fs.writeFileSync(path.resolve(moduleDir, 'types.d.ts'), getTypesContent('ts', type));

  return {
    success: true,
  };
};

export default runExecutor;

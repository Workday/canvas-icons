import {PromiseExecutor} from '@nx/devkit';
import fs from 'fs';
import path from 'path';

import {getSvgContent} from '../../utils';
import {MetadataExecutorSchema} from './schema';

const runExecutor: PromiseExecutor<MetadataExecutorSchema> = async options => {
  const {iconType} = options;

  const packageRoot = process.cwd();
  const packageDistDir = path.join(packageRoot, 'dist');

  const iconDir = path.join(packageDistDir, 'svg');
  const moduleDir = path.join(packageDistDir, 'sprite');

  const icons = fs.readdirSync(iconDir).filter(file => /.svg$/.test(file));

  const iconContent = icons
    .map((icon: string) => {
      const iconFilePath = path.resolve(iconDir, icon);

      fs.mkdirSync(moduleDir, {recursive: true});

      const svg = getSvgContent(iconFilePath);

      return svg.replace('<svg', `<svg id="${icon.replace('.svg', '')}"`).replace(/\n/g, '');
    })
    .join('\n\t\t');

  const content = `<svg width="0" height="0" style="position:absolute">\n\t<defs>\n\t\t${iconContent}\n\t</defs>\n</svg>`;

  fs.writeFileSync(path.resolve(moduleDir, `wd-${iconType}-icon-sprite.svg`), content);

  return {
    success: true,
  };
};

export default runExecutor;

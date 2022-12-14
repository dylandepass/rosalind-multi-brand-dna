/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const fs = require('fs').promises;
const cp = require('child_process');
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher(prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return ['sizing', 'spacing', 'borderRadius', 'borderWidth', 'x', 'y', 'blur', 'spread'].includes(prop.type) && !prop.name.includes('multiplier');
  },
  transformer(prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return `${parseFloat(prop.original.value)}px`;
  },
});

StyleDictionary.registerTransform({
  name: 'sizes/rem',
  type: 'value',
  matcher(prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return ['fontSizes', 'fontSize', 'lineHeights', 'lineHeight'].includes(prop.type) && !prop.name.includes('multiplier');
  },
  transformer(prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return `${parseFloat(prop.original.value) * 0.0625}rem`;
  },
});

function getStyleDictionaryConfig(theme, files) {
  return {
    source: files,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `dist/css/${theme}/`,
        prefix: 'ros',
        files: [{
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        }],
        transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'sizes/px', 'sizes/rem', 'color/css'],
      },
      scss: {
        transformGroup: 'scss',
        buildPath: `dist/scss/${theme}/`,
        prefix: 'ros',
        files: [{
          destination: 'tokens.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        }],
        transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'sizes/px', 'sizes/rem', 'color/css'],
      },
    },
  };
}

async function transformTokens() {
  const tokenThemesBuffer = await fs.readFile('./tokens/$themes.json');
  const themesJson = JSON.parse(tokenThemesBuffer.toString());

  themesJson.forEach((theme) => {
    const sourceSets = [];
    const sets = Object.keys(theme.selectedTokenSets).filter((set) => {
      const type = theme.selectedTokenSets[set];
      if (type === 'disabled') {
        return false;
      }

      if (type === 'source') {
        sourceSets.push(set);
      }

      return true;
    });

    const tokenTransformerArgs = ['token-transformer', '--throwErrorWhenNotResolved', '--expandTypography=true', 'tokens', `./tokens/${theme.name}.json`, sets.join(','), sourceSets.join(',')];

    cp.spawnSync('npx', tokenTransformerArgs);

    const sd = StyleDictionary.extend(getStyleDictionaryConfig(theme.name, [`./tokens/${theme.name}.json`]));
    sd.buildAllPlatforms();
  });
}

transformTokens();

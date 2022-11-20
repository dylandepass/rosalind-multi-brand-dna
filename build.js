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

/* eslint no-console: 0 */

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

console.log('Build started...');

['light', 'dark'].forEach((theme) => {
  const sd = StyleDictionary.extend(getStyleDictionaryConfig(theme, [`tokens/${theme}-theme.json`, 'tokens/global.json']));
  sd.buildAllPlatforms();
});

console.log('\n==============================================');

console.log('\nBuild completed!!');

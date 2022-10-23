const StyleDictionary = require('style-dictionary');
const baseConfig = require('./style-dictionary.config.json')

StyleDictionary.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: function(prop) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSizes", "fontSize", "lineHeights", "lineHeight", "sizing", "spacing", "borderRadius"].includes(prop.type) && !prop.name.includes('multiplier');
    },
    transformer: function(prop) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'px';
    }
    });

console.log('Build started...');

const sd = StyleDictionary.extend(baseConfig)

sd.buildAllPlatforms()
console.log('\n==============================================');

console.log('\nBuild completed!!');
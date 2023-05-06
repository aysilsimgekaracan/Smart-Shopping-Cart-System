// get defaults assetExts array
const defaultAssetExts = require('metro-config/src/defaults/defaults')
    .assetExts;

module.exports = {
    // ...

    resolver: {
        assetExts: [...defaultAssetExts, 'ptl'],
    },

    // ...
};

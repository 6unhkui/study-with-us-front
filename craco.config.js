const CracoAntDesignPlugin = require("craco-antd");

process.env.BROWSER = 'none';

module.exports = {
    babel : {
        plugins : 
            process.env.NODE_ENV === 'production' ? [["transform-remove-console", { "exclude": [ "error", "warn"] }]] : []
    },
    plugins: [{ plugin: CracoAntDesignPlugin }]
};
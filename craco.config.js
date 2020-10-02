const CracoAntDesignPlugin = require("craco-antd");

process.env.BROWSER = 'none';

module.exports = {
    plugins: [{ plugin: CracoAntDesignPlugin }]
};
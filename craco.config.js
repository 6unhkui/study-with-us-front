const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

process.env.BROWSER = "none";

module.exports = {
    babel: {
        plugins: process.env.NODE_ENV === "production" ? [["transform-remove-console", { exclude: ["error", "warn"] }]] : []
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: path.join(__dirname, "src/assets/css/base/_variables.less")
            }
        }
    ]
};

const path = require("path");

const WebpackBar = require("webpackbar");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
    webpack: {
        plugins: [
            new WebpackBar({ profile: true }),
            ...(isDevelopment ? [new BundleAnalyzerPlugin({ openAnalyzer: false })] : [])
        ]
    },
    babel: {
        plugins: isDevelopment ? [] : [["transform-remove-console", { exclude: ["error", "warn"] }]]
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: path.join(__dirname, "src/styles/antd.customize.less")
            }
        },
        {
            plugin: CracoLessPlugin,
            options: {
                cssLoaderOptions: {
                    modules: {
                        getLocalIdent: (context, localIdentName, localName, options) => {
                            if (context.resourcePath.includes("node_modules")) {
                                return localName;
                            }
                            return getCSSModuleLocalIdent(context, localIdentName, localName, options);
                        }
                    }
                },
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                },
                modifyLessRule(lessRule) {
                    lessRule.test = /\.(module)\.(less)$/;
                    lessRule.exclude = path.join(__dirname, "node_modules");
                    return lessRule;
                }
            }
        },
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: "./tsconfig.extend.json"
            }
        }
    ]
};

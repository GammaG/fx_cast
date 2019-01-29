"use strict";

const path              = require("path");
const webpack           = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const includePath = path.resolve(__dirname, "src");

module.exports = (env) => ({
    entry: {
        "main"           : `${includePath}/main.js`
      , "popup/bundle"   : `${includePath}/popup/index.jsx`
      , "options/bundle" : `${includePath}/options/index.jsx`
      , "action/bundle"  : `${includePath}/action/index.jsx`
      , "shim/bundle"    : `${includePath}/shim/index.js`
      , "content"        : `${includePath}/content.js`
      , "contentSetup"   : `${includePath}/contentSetup.js`
      , "mediaCast"      : `${includePath}/mediaCast.js`
      , "mirroringCast"  : `${includePath}/mirroringCast.js`
      , "messageRouter"  : `${includePath}/messageRouter.js`
      , "compat/youtube" : `${includePath}/compat/youtube.js`
    }
  , output: {
        filename: "[name].js"
      , path: `${env.outputPath}`
    }
  , plugins: [
        new webpack.DefinePlugin({
            "EXTENSION_NAME"      : JSON.stringify(env.extensionName)
          , "EXTENSION_ID"        : JSON.stringify(env.extensionId)
          , "EXTENSION_VERSION"   : JSON.stringify(env.extensionVersion)
          , "MIRRORING_APP_ID"    : JSON.stringify(env.mirroringAppId)
          , "APPLICATION_NAME"    : JSON.stringify(env.applicationName)
          , "APPLICATION_VERSION" : JSON.stringify(env.applicationVersion)
        })

        // Copy static assets
      , new CopyWebpackPlugin([
          {
                from: includePath
              , to: env.outputPath
              , ignore: [ "*.js", "*.jsx" ]
              , transform (content, path) {
                    // Access to variables in static files
                    if (path.endsWith(".json")) {
                        return Buffer.from(content.toString()
                            .replace("EXTENSION_NAME", env.extensionName)
                            .replace("EXTENSION_ID", env.extensionId)
                            .replace("EXTENSION_VERSION", env.extensionVersion)
                            .replace("MIRRORING_APP_ID", env.mirroringAppId)
                            .replace("APPLICATION_NAME", env.applicationName)
                            .replace("APPLICATION_VERSION", env.applicationVersion));
                    }

                    return content;
                }
            }
          , {
                // Copy vendor dir
                from: path.join(includePath, "vendor")
              , to: path.join(env.outputPath, "vendor")
            }
        ])
    ]
  , mode: "development"
  , module: {
        rules: [
            {
                test: /\.jsx?$/
              , resolve: {
                    extensions: [ ".js", ".jsx" ]
                }
              , include: `${includePath}`
              , use: {
                    loader: "babel-loader"
                  , options: {
                        presets: [
                            "@babel/preset-react"
                        ]
                      , plugins: [
                            "@babel/proposal-class-properties"
                          , "@babel/proposal-do-expressions"
                          , "@babel/proposal-object-rest-spread"
                        ]
                    }
                }
            }
        ]
    }
  , resolve: {
        alias: {
            "react": "preact-compat"
          , "react-dom": "preact-compat"
        }
    }
});

const eslintPluginPrettier = require("eslint-plugin-prettier");
const globals = require("globals");

module.exports = [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    ignores: [
      "build/*",
      "coverage/*",
      ".specmatic/*",
      "dist/*",
      "node_modules/*",
      ".idea/*",
      ".vscode/*",
    ],
  },
];

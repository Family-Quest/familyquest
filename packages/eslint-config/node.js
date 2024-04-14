const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal that utilize VueJS.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  env: {
    node: true,
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "public/",
    "tsconfig.json",
    "package.json",
    "tsoa.json",
    ".eslintrc",
  ],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-trailing-spaces": ["error", { skipBlankLines: true }],
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
  }
};

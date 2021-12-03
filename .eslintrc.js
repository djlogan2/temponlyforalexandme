module.exports = {
  env: {
    browser: true,
    es2021: true,
    meteor: true,
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "@meteorjs/eslint-config-meteor",
    "plugin:react/recommended",
    "google",
    "prettier",
    "prettier/prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": ["error", { ignore: ["^meteor/", "^/"] }],
    "max-len": ["error", { code: 256 }],
    "no-underscore-dangle": ["error", { allow: ["_id", "_lastSessionId"] }],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    quotes: [2, "double", { avoidEscape: true }],
    "require-jsdoc": 0,
    semi: ["error", "always"],
    indent: ["error", "tab"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};

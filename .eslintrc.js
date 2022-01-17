module.exports = {
  env: {
    browser: true,
    es2021: true,
    meteor: true,
    mocha: true,
  },
  plugins: ["react", "@typescript-eslint", "chai-friendly"],
  extends: [
    "eslint:recommended",
    "airbnb",
    "@meteorjs/eslint-config-meteor",
    "plugin:react/recommended",
    "plugin:chai-friendly/recommended",
    "prettier",
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
    "no-unused-vars": "off",
    // "consistent-return": "off",
    // "@typescript-eslint/consistent-return": ["error"],
    "import/no-unresolved": 0,
    "max-len": ["error", { code: 2048 }],
    "no-underscore-dangle": [
      "error",
      { allow: ["_id", "_lastSessionId", "_theme", "_i18n"] },
    ],
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
    "no-use-before-define": 0,
    "class-methods-use-this": 0,
    "react/jsx-props-no-spreading": 0,
    // "@typescript-eslint/no-unused-vars": [true, {"ignore-pattern": "^_"}],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react/require-default-props": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};

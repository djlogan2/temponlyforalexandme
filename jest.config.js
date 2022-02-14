const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  roots: ["<rootDir>/client"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/client/setupTests.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    "\\.scss$": require.resolve("./client/app/__mocks__/styles-mock.js"),
  },
  collectCoverageFrom: [
    "**/*.{ts,js,tsx,jsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!**/dist/**",
    "!**/coverage/**",
  ],
  collectCoverage: true,
};

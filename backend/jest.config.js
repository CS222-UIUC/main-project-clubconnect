/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/?(*.)+(test).ts"],  // Only run files with .test.ts extension
  transformIgnorePatterns: [
    "node_modules/(?!badwords-list|bad-words)"  // Transpile badwords-list or bad-words
  ],
};
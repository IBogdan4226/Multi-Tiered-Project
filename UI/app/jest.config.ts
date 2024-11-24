export default {
  displayName: 'app',
  preset: '../jest.preset.js',
  coverageDirectory: '../coverage/app',
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};

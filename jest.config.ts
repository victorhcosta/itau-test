export default {
  bail: 0,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/?(*.)+(spec).[t]s"
  ],
};

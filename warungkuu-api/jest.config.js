const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  reporters: [
    "default",
    [
      "jest-sonar-reporter",
      {
        outputDirectory: "coverage",
        outputName: "test-report.xml"
      }
    ]
  ],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  transform: {
    ...tsJestTransformCfg,
  },
};
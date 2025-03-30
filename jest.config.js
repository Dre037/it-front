const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    preset: "jest-preset-angular",
    roots: ["<rootDir>/src/"],
    testMatch: ["**/+(*.)+(spec).+(ts)"],
    setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
    collectCoverage: true,
    coverageDirectory: 'test_output',
    coverageReporters: ["json", "html", "text-summary", "clover"],
    coverageDirectory: "coverage",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/",
    }),
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "test-results",
                outputName: "unit-test-results.xml"
            }
        ]
    ]
}
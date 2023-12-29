module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/app/modules/services/**/*.js'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        },
    }
};
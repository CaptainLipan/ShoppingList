
module.exports = {
    testMatch: ["**/tests/**/*.test.js"],
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/']
};

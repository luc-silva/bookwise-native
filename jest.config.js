module.exports = {
    preset: "jest-expo",
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "/node_modules/",
        "/__tests__/testUtils/",
        "/mocks/",
        "/__mocks__/",
    ],
};

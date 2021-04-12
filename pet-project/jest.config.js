module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "($ol).+\\.js$": "babel-jest"
  },
  setupFiles: ['./tests/unit/setup.js'],
  transformIgnorePatterns: [
    "/node_modules/(?!ol)"
  ],
}

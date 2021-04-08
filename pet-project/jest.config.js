module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "($ol).+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!ol)"
  ],
}

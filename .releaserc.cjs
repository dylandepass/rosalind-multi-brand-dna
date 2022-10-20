module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md",
    }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/github", {
      "assets": [
        { "path": "dist/android", "label": "Rosalind DNA for Android" },
        { "path": "dist/compose", "label": "Rosalind DNA for Compose" },
        { "path": "dist/css", "label": "Rosalind DNA for CSS" },
        { "path": "dist/ios", "label": "Rosalind DNA for iOS (Objective C)" },
        { "path": "dist/ios-swift", "label": "Rosalind DNA for iOS (Swift)" },
        { "path": "dist/ios-scss", "label": "Rosalind DNA for SCSS" },
      ]
    }]
  ],
  branches: ['main'],
};

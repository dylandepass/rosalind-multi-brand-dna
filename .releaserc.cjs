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
        { "path": "dist/css/light/tokens.css", "label": "Rosalind DNA CSS (Light Theme)", "name": "light-theme.css" },
        { "path": "dist/css/dark/tokens.css", "label": "Rosalind DNA for CSS (Dark Theme)", "name": "dark-theme.css" },
        { "path": "dist/scss/light/tokens.scss", "label": "Rosalind DNA for SCSS (Light Theme)", "name": "light-theme.scss" },
        { "path": "dist/scss/dark/tokens.scss", "label": "Rosalind DNA for SCSS (Dark Theme)", "name": "dark-theme.scss" },
      ]
    }]
  ],
  branches: ['main'],
};

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
        { "path": "dist/css/light/tokens.css", "label": "Rosalind DNA CSS (Light Theme)", "name": "css-tokens-light" },
        { "path": "dist/css/dark/tokens.css", "label": "Rosalind DNA for CSS (Dark Theme)", "name": "css-tokens-dark" },
        { "path": "dist/scss/light/tokens.scss", "label": "Rosalind DNA for SCSS (Light Theme)", "name": "scss-tokens-light" },
        { "path": "dist/scss/dark/tokens.scss", "label": "Rosalind DNA for SCSS (Dark Theme)", "name": "scss-tokens-dark" },
      ]
    }]
  ],
  branches: ['main'],
};

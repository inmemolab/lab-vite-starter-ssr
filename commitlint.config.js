/* eslint-disable no-useless-escape */
/*
 * @Description: commit-msg commit information format specification
 *
 * commit-msg format: <type>(scope?): <subject>
 * - build: Compile related changes, such as releases, changes to project builds or dependencies
 * - chore: other modifications, such as changing the build process, or adding dependent libraries, tools, etc.
 * - ci: continuous integration modification
 * - docs: only documentation additions/changes (documentation)
 * - feat: new features, new features (feature)
 * - fix: fix bug (fixbug)
 * - optimize: optimize build tools or runtime performance
 * - perf: optimization related, such as improving performance, experience
 * - refactor: code refactoring
 * - revert: roll back to the previous version
 * - scope: An optional modification scope. Used to identify which module in the code this commit mainly involves.
 * - style: code format modification, note that it is not a css modification
 * - Subject: Describe the main content of this submission in one sentence, keep it concise
 * - test: test case modification
 * - type: Used to indicate the type of change we submitted this time, is it a new feature? Or modified the test code? Or is the documentation updated?
 * - update: update a function
 */
const type = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "optimize",
  "perf",
  "refactor",
  "revert",
  "scope",
  "style",
  "Subject",
  "test",
  "type",
  "update"
];

module.exports = {
  ignores: [(commit) => commit.includes("init")], // ignore information with init
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      headerCorrespondence: ["type", "scope", "subject"],
      referenceActions: [
        "close",
        "closes",
        "closed",
        "fix",
        "fixes",
        "fixed",
        "resolve",
        "resolves",
        "resolved"
      ],
      issuePrefixes: ["#"],
      noteKeywords: ["BREAKING CHANGE", "INCOMPATIBLE CHNAGES"],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ["header", "hash"],
      mergePattern: null,
      mergeCorrespondence: null
    }
  },
  rules: {
    "type-empty": [2, "never"], // <type> cannot be empty
    "type-enum": [2, "always", [...type]], // <type> specifies the type to use
    "type-case": [0],
    "scope-empty": [0], // <scope> can be empty
    "subject-empty": [2, "never"], // <subject> cannot be empty (default)
    "subject-full-stop": [2, "never", "."], // <subject> does not end with '.'
    "subject-case": [0],
    "header-max-length": [2, "always", 72], // header max 72 characters
    "body-leading-blank": [1, "always"], // there should be a line break above the body
    "footer-leading-blank": [1, "always"] // there should be a line break above the footer
  }
};

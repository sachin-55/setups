/**
 * CONFIGURATION:
 * Each rule is an array: [severity, condition, value]
 * 0 = disabled, 1 = warning, 2 = error
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    // 'body-max-line-length': [2, 'always', 100], // body lines max 100 chars
    // 'footer-max-line-length': [2, 'always', 100], // footer lines max 100 chars
    //   'header-max-length': [2, 'always', 72],
    //   'header-min-length': [2, 'always', 10],
    //   'scope-case': [2, 'always', 'lower-case'],
    //   'subject-case': [
    //     2,
    //     'never',
    //     ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    //   ],
    //   'subject-empty': [2, 'never'],
    //   'subject-full-stop': [2, 'never', '.'],
    //   'type-case': [2, 'always', 'lower-case'],
    //   'type-empty': [2, 'never'],
    //   'type-enum': [
    //     2,
    //     'always',
    //     [
    //       'build', // build system or dependency changes
    //       'chore', // maintenance tasks, no prod code change
    //       'ci', // CI/CD config changes
    //       'docs', // documentation only
    //       'feat', // new feature
    //       'fix', // bug fix
    //       'perf', // performance improvement
    //       'refactor', // code change, no fix or feature
    //       'revert', // reverts a previous commit
    //       'style', // formatting, whitespace (no logic change)
    //       'test', // adding or fixing tests
    //     ],
    //   ],
  },
};

/**
 * FORMAT:
 *
 * <type>(<scope>): <subject>
 * <blank line>
 * <body>
 * <blank line>
 * <footer>
 */

/**
 * EXAMPLE :
 *
 * feat(auth): add OAuth2 login support
 *
 * Implements Google and GitHub OAuth providers.
 * Closes #42
 */

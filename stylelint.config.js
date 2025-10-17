/* eslint-env node */
module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**/*', 'tmp/**/*', 'node_modules/**/*', 'vendor/**/*'],
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
  },
};

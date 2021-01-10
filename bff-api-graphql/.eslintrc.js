module.exports = {
  plugins: ['node', 'es6'],
  env: {
    jest: true,
    node: true,
    es6: true
  },
  extends: 'airbnb-base/legacy',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'no-underscore-dangle': 0,
    strict: 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-console': 'warn',
    'no-shadow': [0, { hoist: 'never' }],
    'class-methods-use-this': 'off'

  }
}

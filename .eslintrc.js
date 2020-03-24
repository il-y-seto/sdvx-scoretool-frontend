module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    "@typescript-eslint",
  ],
  // add your custom rules here
  rules: {
    // !! で bool キャスト
    'no-extra-boolean-cast': 0,
    // && と || 両方使っても良い
    'no-mixed-operators': 0,
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false }],
    "@typescript-eslint/no-explicit-any": 0,
  }
}

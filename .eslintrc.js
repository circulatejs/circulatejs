module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: ['vue', 'prettier'],
  ignorePatterns: [
    '**/.admin/',
    '**/.env',
    '*.md',
    '*.json',
    '*.log',
    '*.lock',
    '_*',
    '*.sqlite',
    '*.css',
    '*.html',
    '*.svg'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}

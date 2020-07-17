module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true
  },
  globals: {
    ADMIN_PLUGINS: 'readonly',
    ADMIN_LOCATION: 'readonly',
    ADMIN_DEV: 'readonly',
    SCREEN_SIZES: 'readonly'
  },
  extends: ['plugin:vue/essential', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: ['vue', 'prettier'],
  ignorePatterns: [
    '**/.admin/',
    '**/.env',
    '*.txt',
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

import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.mjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-duplicate-case': 'error',
      'no-unreachable': 'error',
      'no-unexpected-multiline': 'error',
    },
  },
];

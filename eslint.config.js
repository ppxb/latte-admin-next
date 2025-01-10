import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    'perfectionist/sort-imports': 'off',
    'style/arrow-parens': ['error', 'as-needed'],
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'ts/no-empty-object-type': 'off',

    'regexp/no-unused-capturing-group': 'off',
  },
})

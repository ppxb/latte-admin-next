import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'ts/no-empty-object-type': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'style/arrow-parens': 'off',
    'style/space-before-blocks': 'off',
    'ts/no-use-before-define': 'off',
    'ts/consistent-type-definitions': 'off',
    "prefer-const": "error"
  },
})

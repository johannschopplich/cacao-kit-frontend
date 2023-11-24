import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
  ...(await antfu(
    {
      stylistic: false,
      ignores: ['tsconfig.json'],
    },
    {
      rules: {
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',
        // Ignore rules clashing with Prettier
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
      },
    },
  )),
]

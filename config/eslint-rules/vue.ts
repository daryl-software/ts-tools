import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import vueParser from "vue-eslint-parser";
import tseslint, {type ConfigArray} from "typescript-eslint";

const config: ConfigArray = [
    ...eslintPluginVue.configs['flat/recommended'],
    {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
            globals: globals.browser,
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            'vue/block-lang': ['error', { script: { lang: 'ts' } }],
            'vue/block-order': ['error', { order: ['script[setup]', 'template', 'style[scoped]'] }],
            'vue/component-api-style': ['error', ['script-setup']],
            'vue/component-name-in-template-casing': 'error',
            'vue/custom-event-name-casing': 'error',
            'vue/define-emits-declaration': 'error',
            'vue/prefer-template': 'error',
            'vue/define-macros-order': [
                'error',
                {
                    order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
                    defineExposeLast: true,
                },
            ],
            'vue/define-props-declaration': 'error',
            'vue/html-button-has-type': 'error',
            'vue/no-multiple-objects-in-class': 'warn',
            'vue/no-root-v-if': 'error',
            'vue/no-template-target-blank': 'error',
            'vue/no-undef-components': 'warn',
            'vue/no-undef-properties': 'warn',
            'vue/no-unused-refs': 'warn',
            'vue/no-use-v-else-with-v-for': 'error',
            'vue/no-useless-mustaches': 'warn',
            'vue/no-useless-v-bind': 'warn',
            'vue/no-v-text': 'error',
            'vue/padding-line-between-blocks': 'warn',
            'vue/prefer-define-options': 'error',
            'vue/prefer-separate-static-class': 'warn',
            'vue/prefer-true-attribute-shorthand': 'warn',
            'vue/require-macro-variable-name': 'error',
            'vue/require-typed-ref': 'warn',
            'vue/v-for-delimiter-style': 'error',
            'vue/valid-define-options': 'error',
        },
    },
];

export default config;
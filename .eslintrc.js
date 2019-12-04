module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        curly: 'error',
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'any',
                    normal: 'any',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
    },
}

const VuelidateErrorGenerator = {
    install(Vue, { defaultMessageFunctions }) {
        defaultMessageFunctions = defaultMessageFunctions || {}
        const mergedDefaultMessageFunctions = Object.assign(
            {},
            {
                default({ name }) {
                    if (name) {
                        return `${name} is invalid`
                    } else {
                        return 'Field is invalid'
                    }
                },
            },
            defaultMessageFunctions,
        )
        Vue.mixin({
            localMessageFunctions: {
                default: {},
            },
            computed: {
                mergedMessageFunctions() {
                    return Object.assign({}, mergedDefaultMessageFunctions, this.$options.localMessageFunctions.default)
                },
            },
            methods: {
                getErrorMessages(field, attributes) {
                    const fieldValidation = this.$v[field]
                    const validationTypes = Object.keys(fieldValidation.$params)

                    const mergedFieldMessageFunctions = Object.assign(
                        {},
                        this.mergedMessageFunctions,
                        this.$options.localMessageFunctions[field],
                    )

                    attributes.name = attributes.name ? attributes.name : field

                    if (fieldValidation.$error) {
                        return validationTypes
                            .filter(validationType => !fieldValidation[validationType])
                            .map(validationType =>
                                getErrorMessage(validationType, attributes, mergedFieldMessageFunctions),
                            )
                    } else {
                        return []
                    }
                },
            },
        })
    },
}

export default VuelidateErrorGenerator

const getErrorMessage = (validationType, attributes, messageFunctions) => {
    const messageFunc = messageFunctions[validationType]
    if (messageFunc) {
        return messageFunc(attributes)
    } else {
        return messageFunc.default(attributes)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuelidateErrorGenerator)
}

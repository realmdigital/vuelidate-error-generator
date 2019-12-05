# Vuelidate Error Generator

## Installation
### NPM
```bash
npm install vuelidate-error-generator --save
```
OR
```bash
yarn add vuelidate-error-generator
```

```javascript
import VuelidateErrorGenerator from 'vuelidate-error-generator'
import Vue from 'vue'

Vue.use(VuelidateErrorGenerator)
```

## Description
Vuelidate Error Generator is a lightweight configurable error message generator for [Vuelidate](https://vuelidate.js.org/)

## Usage
To set up local error messages.
```javascript
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data() {
        return {
            emailAddress: '',
            password: '',
        }
    },
    localMessageFunctions: {
        emailAddress: {
            required(_) {
                return `Your Email address is required`
            },
        },
        default:{
            required({name}) {
                return `${name} is required`
            },
            email(_){
                return `Please provide a valid email address`
            },
        },
    },
    validations: {
        emailAddress: {
            required,
            email,
        },
        password: {
            required,
        },
    },
}
```
To generate error messages just call `getErrorMessages('nameOfModel', { someAtribute: 'used in the validation functions' })`

To setup global default error messages pass in the `defaultMessageFunctions` option during `Vue.use(...)`.
```javascript
import VuelidateErrorGenerator from `vuelidate-error-generator`
import Vue from 'vue'

const myDefaultMessageFunctions = {
    // Refers to the validation called 'email'
    email(_) {
        return 'Email address is invalid'
    },
    required({ name }) {
        if (name) {
            return `${name} is required`
        } else {
            return `Field is required`
        }
    },
    // Runs if there is no message specified for the relevant validator
    default({ name }) {
        if (name) {
            return `${name} is invalid`
        } else {
            return 'Field is invalid'
        }
    },
}

Vue.use(VuelidateErrorGenerator, { defaultMessageFunctions: myDefaultMessageFunctions })
```

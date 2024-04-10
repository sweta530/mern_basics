const { isEmpty } = require('../../utility/index')

function loginValidation(params) {
    let error = {}

    if (isEmpty(params.email)) {
        error.title = "Field should not be empty";
    }
    if (isEmpty(params.password)) {
        error.price = "Field should not be empty";
    }

    return {
        error,
        isValid: isEmpty(error)
    };
}

module.exports.loginValidation = loginValidation
const { isEmpty } = require('../../utility/index')

function logInValidation(params) {
    let error = {}

    if (isEmpty(params.email)) {
        error.first_name = "Field should not be empty";
    }
    if (isEmpty(params.password)) {
        error.phone = "Field should not be empty";
    }

    return {
        error,
        isValid: isEmpty(error)
    };
}

module.exports.logInValidation = logInValidation
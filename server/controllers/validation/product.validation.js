const { isEmpty } = require('../../utility/index')

function addProductValidation(params) {
    let error = {}

    if (isEmpty(params.title)) {
        error.title = "Field should not be empty";
    }
    if (isEmpty(params.price)) {
        error.price = "Field should not be empty";
    }
    if (isEmpty(params.rating)) {
        error.rating = "Field should not be empty";
    }
    if (isEmpty(params.category)) {
        error.category = "Field should not be empty";
    }

    return {
        error,
        isValid: isEmpty(error)
    };
}

module.exports.addProductValidation = addProductValidation
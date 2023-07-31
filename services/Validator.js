class Validator {
    // initialize validator
    initValidator(Validator) {
        this.validator = Validator;
    }

    // validate input, check if input is string and not empty
    validate(input) {
        return typeof input === 'string' && input.length > 0;
    }
}

module.exports = Validator;

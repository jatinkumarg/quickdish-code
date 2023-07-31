const Validator = require('./Validator');

class UserValidator extends Validator {
    // initialize validator
    initValidator(Validator) {
        this.validator = Validator;
    }

    // validate data
    validate(data) {
        if (data?.type === 'signup') {
            // check user input for signup page
            return typeof data?.name === 'string' && typeof data?.email === 'string' && typeof data?.password === 'string' && typeof data?.confirm === 'string' && data?.password === data?.confirm && data?.password.length > 0 && data?.confirm.length > 0 && data?.name.length > 0 && data?.email.length > 0;
        } else if (data?.type === 'signin') {
            // check user input for signin page
            return typeof data?.email === 'string' && typeof data?.password === 'string' && data?.password.length > 0 && data?.email.length > 0;
        }
    }
}

module.exports = UserValidator;

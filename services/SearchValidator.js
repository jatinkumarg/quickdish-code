const Validator = require('./Validator');

class SearchValidator extends Validator {
    // initialize validator
    initValidator(Validator) {
        this.validator = Validator;
    }
}

module.exports = SearchValidator;

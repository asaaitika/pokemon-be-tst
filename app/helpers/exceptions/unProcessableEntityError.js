const ApplicationError = require('./applicationError');

class UnprocessableEntityError extends ApplicationError {
    constructor(message) {
        super(message || 'Data cannot be processed!', false, 422);
    }
}

module.exports = UnprocessableEntityError;

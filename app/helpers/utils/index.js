const handleErrorValidation = (array) => {
    return array.reduce(
        (obj, item) => ((obj['message'] = { field: item.dataPath, message: item.dataPath + ' ' + item.message }), obj),
        {}
    );
};

const returnError = (statusCode, message = '', errors = []) => {
    return statusCode, message, errors;
};

const DateHelper = require('./dateHelper');
const PhoneHelper = require('./formating/phoneNumber');
const CurrencyHelper = require('./formating/currency');

module.exports = {
    DateHelper,
    PhoneHelper,
    CurrencyHelper
};

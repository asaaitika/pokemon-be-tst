//using internatiopnal standard phone number
const reformatPhoneNumber = (phone) => {
    let valid_phone = '';

    if (phone[0] === '0') {
        valid_phone = '62' + phone.substr(1, phone.length);
    } else {
        valid_phone = phone;
    }
    return valid_phone;
};

module.exports = {
    reformatPhoneNumber
};

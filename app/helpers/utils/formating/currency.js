/**
 * [formatRupiah using ext 00 or not]
 *
 * if TRUE [RP 100.000.00] else [RP 100.000]
 *
 * @param  {[type]}  number        [description]
 * @param  {Boolean} [type=false] [default]
 * @return {[type]}               [description]
 */
const formatRupiah = (angka, type = false) => {
    let ext = '';
    if (type) ext = '.00';
    let reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return `RP ${ribuan}` + ext;
};

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
    reformatPhoneNumber,
    formatRupiah
};

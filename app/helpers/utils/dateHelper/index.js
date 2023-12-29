const filterDates = (dates, excludeDays, format = null) => {
    return dates.filter((date) => isDateExist(excludeDays, date));
};

const isDateExist = (excludeDays, date, format = null) => {
    if (format) {
        return !excludeDates.includes(dayjs(date).format(format));
    }
    return !excludeDates.includes(dayjs(date).format());
};

const rangeDates = (startDate, endDate, excludeDays = [], excludeDates = [], clientTimezone = 'Asia/Jakarta') => {
    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    const timezone = require('dayjs/plugin/timezone');
    dayjs.extend(utc);
    dayjs.extend(timezone);

    dayjs.tz(clientTimezone);
    let start = dayjs(startDate);
    let end = dayjs(endDate);
    // let totalDays = dayjs(startDate).diff(endDate, 'day') + 1;

    let dates = [start.format()];
    while (start < end) {
        start = start.add(1, 'day');
        dates.push(start.format());
    }

    let results = [];

    if (excludeDates.length > 0) {
        results = filterDates(dates, excludeDates);
        return results;
    }

    results = dates;
    return results;
};

const createDate = (day, inputIimezone = 'Asia/Jakarta') => {
    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    const timezone = require('dayjs/plugin/timezone');
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const defauTimezone = inputIimezone;

    let date = null;
    if (day) date = dayjs(day).tz(defauTimezone);
    else date = dayjs().tz(defauTimezone);
    return date;
};

module.exports = {
    rangeDates,
    createDate
};

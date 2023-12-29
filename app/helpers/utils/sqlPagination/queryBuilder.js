const { Op } = require('sequelize');
const { BadRequestError } = require('../../exceptions');

const DEFAULT_SORT_ORDER = 'ASC';

/**
 * Get type sorting query
 * @param {String} type
 */
const getTypeSort = (type) => {
    const newType = type ? toLowerCaseString(type) : '1';

    switch (newType) {
        case '-1':
        case 'desc':
            return -1;
        case '1':
        case 'asc':
            return 1;

        default:
            return 1;
    }
};

const handleFieldSearch = (search, fieldToSearch) => {
    if (search && fieldToSearch.length == 0) {
        throw new BadRequestError('Please provide field to search');
    }

    const results = [];
    let querySearch = {};
    fieldToSearch.forEach((field) => {
        querySearch[field] = { ['Op.iLike']: `%${search}%` };
    });
    results.push(querySearch);

    return results;
};

const handleFieldOrder = (payload) => {
    const { sortBy, sortOrder } = payload;
    let order = ['id', 'DESC'];
    if (sortBy && sortOrder) order = [sortBy, sortOrder];

    return [order];
};

module.exports = {
    handleFieldSearch,
    handleFieldOrder
};

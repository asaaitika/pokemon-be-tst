const { Op } = require('sequelize');
const { BadRequestError } = require('../../exceptions');
const {} = require('./queryBuilder');
/**
 *
 * @param {number} page
 * @param {number} size
 * @returns object
 */
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

/**
 *
 * @param {object} models
 * @param {number} page
 * @param {number} limit
 * @returns {}
 */
const getPagingData = (models, page, limit) => {
    const { count: total, rows: data } = models;
    const currentPage = page ? +page : 0;
    const currentPageFront = page ? +page + Number(1) : Number(1);
    const totalPages = Math.ceil(total / limit - Number(1));
    const totalPagesFront = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            total,
            totalPages,
            totalPagesFront,
            currentPage,
            currentPageFront
        }
    };
};

module.exports = {
    buildPagination: async (payload, fieldToSearch, model) => {
        try {
            const page = payload.page || 0;
            const size = payload.size || 10;
            const search = payload.search || null;
            const filter = payload.filter || null;

            const { limit, offset } = getPagination(page, size);

            let query = {};
            if (search && fieldToSearch && fieldToSearch.length > 0) {
                const setFieldToSearch = handleFieldSearch(search, fieldToSearch);
                query = {
                    where: {
                        [Op.or]: setFieldToSearch
                    }
                };
            }

            const models = await model.findAndCountAll({
                // attributes: ['id', 'name', 'created_at'],
                query,
                order: sort,
                limit,
                offset
            });

            const response = getPagingData(models, page, limit);

            let finalQuery = [
                { $match: query },
                { $sort: payload.sort },
                { $skip: (payload.page - 1) * payload.size },
                { $limit: payload.size },
                { $project: projection }
            ];
        } catch (error) {}
    }
};

const { CaughtPokemon } = require('../../models');

const create = async (payload) => {
    return await CaughtPokemon.create(payload);
};

const findAll = async () => {
    return await CaughtPokemon.findAll();
};

const filterBy = async (filter, visible) => {
    return await CaughtPokemon.findAll({ attributes: visible, where: { ...filter } });
};

const findOneBy = async (filter) => {
    return await CaughtPokemon.findOne({ where: { ...filter } });
};

const update = async (payload, where) => {
    return await CaughtPokemon.update(payload, where); 
};

const hardDelete = async (id) => {
    return await CaughtPokemon.destroy({ where: { id } });
};

const softDelete = async (filter) => {
    return await CaughtPokemon.update({ id: null }, { filter });
};

module.exports = {
    create,
    findAll,
    filterBy,
    findOneBy,
    update,
    hardDelete,
    softDelete
};

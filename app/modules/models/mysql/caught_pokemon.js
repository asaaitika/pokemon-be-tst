const { DataTypes } = require('sequelize');
const Db = require('../../../libraries/db/sql');

const CaughtPokemon = Db.mysql.define(
    'caught_pokemon',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pokemon_id: DataTypes.INTEGER,
        pokemon_name: DataTypes.STRING,
        image_url: DataTypes.TEXT,
        nickname : DataTypes.STRING,
        catch_date : DataTypes.DATE,
        is_released : DataTypes.BOOLEAN
    }, { timestamps: false, freezeTableName: true }
)

module.exports = CaughtPokemon

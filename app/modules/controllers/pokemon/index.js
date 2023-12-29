require('dotenv').config()

const { SchemaValidator, ResponseHandler } = require('../../../helpers');
const { logger } = require('../../../helpers/logging');
const { CatchPayload, RenamePayload } = require('../../schemas/pokemon');
const { PokemonService } = require('../../services');

module.exports = {
    list: async (req, res) => {
        try {
            const getList = await PokemonService.getPokemonList()

            ResponseHandler.success(res, getList)
        } catch (error) {
            logger.error('[LIST][POKEMON][FAILED] >>> ', error)
            ResponseHandler.error(res, error)
        }
    },
    detail: async (req, res) => {
        try {
            const { id } = req.params

            const getData = await PokemonService.getPokemonDetail(id)

            ResponseHandler.success(res, getData)
        } catch (error) {
            logger.error('[DETAIL][POKEMON][FAILED] >>> ',error)
            ResponseHandler.error(res, error)
        }
    },
    catch: async (req, res) => {
        try {
            const { body } = req

            const validatedPayload = await SchemaValidator.validateSchema(body, CatchPayload)
            const processCatch = await PokemonService.catchPokemon(validatedPayload)

            ResponseHandler.success(res, processCatch)
        } catch (error) {
            logger.error('[CATCH][POKEMON][FAILED] >>> ', error)
            ResponseHandler.error(res, error)
        }
    },
    caught_list: async (req, res) => {
        try {
            const getList = await PokemonService.getCaughtPokemonList()

            ResponseHandler.success(res, getList)
        } catch (error) {
            logger.error('[CAUGHT LIST][POKEMON][FAILED] >>> ',error)
            ResponseHandler.error(res, error)
        }
    },
    rename: async (req, res) => {
        try {
            const { body, params } = req
            const { id } = params

            let dynamicPayload = {
                "id": parseInt(id),
                "nickname": body.nickname,
            }

            const validatedPayload = await SchemaValidator.validateSchema(dynamicPayload, RenamePayload)
            const processRename = await PokemonService.renameNicknamePokemon(validatedPayload)
        
            ResponseHandler.success(res, processRename)
        } catch (error) {
            logger.error('[RENAME][POKEMON][FAILED] >>> ', error)
            ResponseHandler.error(res, error)
        }
    },
    release: async (req, res) => {
        try {
            const { params } = req
            const { id } = params

            const processRename = await PokemonService.releasePokemon(id)
        
            ResponseHandler.success(res, processRename)
        } catch (error) {
            logger.error('[RELEASE][POKEMON][FAILED] >>> ', error)
            ResponseHandler.error(res, error)
        }
    },
}

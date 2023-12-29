require('dotenv').config()

const { env } = process
const { BadRequestError } = require('../../../helpers/exceptions')
const { logger } = require('../../../helpers/logging')
const { get } = require('../../../libraries/request')

// Repositories
const { CaughtPokemonRepository } = require('../../repositories')

let pokemonData = {}

// Functions
const fibonacci = (n) => {
    if (n <= 1) return n
    
    return fibonacci(n - 1) + fibonacci(n - 2)
}

const isPrime = (num) => {
    if (num <= 1) return false

    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false
    }
    
    return true
}

const updateNickname = async (id, newNickname) => {
    let renameCounter = 0;
  
    const getData = await CaughtPokemonRepository.filterBy({ id }, ["id", "pokemon_id", "pokemon_name", "image_url", "nickname"])
  
    if (getData.length > 0) {
        renameCounter = getData[0].renameCounter || 0;
    }

    if (!pokemonData[id]) {
        pokemonData[id] = {
            nickname: `${newNickname}-${renameCounter}`,
            renameCounter: renameCounter + 1,
        };
    } else {
        const { nickname, renameCounter } = pokemonData[id]
        const newRenameCounter = fibonacci(renameCounter)
        pokemonData[id] = {
            nickname: `${newNickname}-${newRenameCounter}`,
            renameCounter: renameCounter + 1,
        }
    }
}

module.exports = {
    getPokemonList: async () => {
        try {
            const allPokemon = await get(`${env.POKEMON_URL}/pokemon?limit=20`)
            const pokemonList = allPokemon.results

            const enhancedPokemonList = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const pokemonDetailsResponse = await get(`${env.POKEMON_URL}/pokemon/${pokemon.name}`)
                    const { id, sprites } = pokemonDetailsResponse
                    return {
                        id: id,
                        name: pokemon.name,
                        img: sprites.other["official-artwork"].front_default,
                    };
                })
            )

            return enhancedPokemonList
        } catch (error) {
            throw new BadRequestError(error)
        }
    },
    getPokemonDetail: async (id) => {
        try {
            const pokemonDetail = await get(`${env.POKEMON_URL}/pokemon/${id}`)
            const getPokemon = {
                id: pokemonDetail.id,
                name: pokemonDetail.name,
                images: pokemonDetail.sprites.other["official-artwork"].front_default,
                moves: pokemonDetail.moves,
                types: pokemonDetail.types
            }

            return getPokemon
        } catch (error) {
            throw error
        }
    },
    catchPokemon: async (payload) => {
        try {
            const isCaught = Math.random() < 0.5

            if (isCaught) {
                const createData = await CaughtPokemonRepository.create({
                    pokemon_id: payload.pokemon_id,
                    pokemon_name: payload.pokemon_name,
                    image_url: payload.image_url,
                    nickname: payload.nickname,
                })
                logger.info(`CATCH POKEMON >>>>>  Done - ${payload.nickname}`)

                return createData
            } else {
                throw new Error("Pokemon not caught")
            }
        } catch (error) {
            throw error;
        }
    },
    getCaughtPokemonList: async () => {
        try {
            const getData = await CaughtPokemonRepository.filterBy({
                is_released: false
            }, ["id", "pokemon_id", "pokemon_name", "image_url", "nickname"])

            return getData
        } catch (error) {
            throw new BadRequestError(error)
        }
    },
    renameNicknamePokemon: async (payload) => {
        try {
            const id  = payload.id
            const newNickname = payload.nickname

            await updateNickname(id, newNickname)

            const { nickname } = pokemonData[id]
            
            const updateData = await CaughtPokemonRepository.update({
                nickname: nickname
            }, {
                where: { id: id }
            })

            return updateData
        } catch (error) {
            throw new Error("Nickname of Pokemon can't rename")
        }
    },   
    releasePokemon: async (id) => {
        try {
            const { nickname, renameCounter } = pokemonData[id]

            if (renameCounter > 0) {
                if (isPrime(renameCounter)) {
                    const updateData = await CaughtPokemonRepository.update({
                        is_released: true
                    }, {
                        where: { id: id }
                    })

                    delete pokemonData[id]
                    return { description: `Pokemon ${nickname} released successfully`, rows: updateData };
                } else {
                    return { description: `Release failed. Pokemon ${nickname} has non-prime renameCounter` };
                }
            } else {
                const updateData = await CaughtPokemonRepository.update({
                    is_released: true
                }, {
                    where: { id: id }
                })

                delete pokemonData[id]
                return { description: `Pokemon ${nickname} released successfully`, rows: updateData };
            }
        } catch (error) {
            throw new BadRequestError(error)                              
        }
    },   
}

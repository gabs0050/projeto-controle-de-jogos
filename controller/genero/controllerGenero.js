/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD do genero
 * Autor: Gabriel Souza Costa
 * Data: 17/04/2024
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const generoDAO = require('../../model/DAO/genero.js')

// Função para inserir um novo gênero
const inserirGenero = async function (genero) {
    try {
        if (!genero.nome || genero.nome.length > 100) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let result = await generoDAO.insertGenero(genero)
        return result ? MESSAGE.SUCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para listar todos os gêneros
const listarGenero = async function () {
    try {
        let result = await generoDAO.selectAllGenero()
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para buscar um gênero pelo ID
const buscarGenero = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let result = await generoDAO.selectByIdGenero(id)
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para atualizar um gênero
const atualizarGenero = async function (genero, id) {
    try {
        if (!genero.nome || genero.nome.length > 100 || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let generoExistente = await generoDAO.selectByIdGenero(id)
        if (!generoExistente) {
            return MESSAGE.ERROR_NOT_FOUND
        }

        genero.id = id
        let result = await generoDAO.updateGenero(genero)
        return result ? MESSAGE.SUCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para excluir um gênero
const excluirGenero = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let generoExistente = await generoDAO.selectByIdGenero(id)
        if (!generoExistente) {
            return MESSAGE.ERROR_NOT_FOUND
        }

        let result = await generoDAO.deleteGenero(id)
        return result ? MESSAGE.SUCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

module.exports = {
    inserirGenero,
    listarGenero,
    buscarGenero,
    atualizarGenero,
    excluirGenero
}
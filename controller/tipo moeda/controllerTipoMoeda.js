/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD do tipo moeda
 * Autor: Gabriel Souza Costa
 * Data: 17/04/2024
 * Versão: 1.0
 *************************************************************************************/

//Importdo arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const tipoMoedaDAO = require('../../model/DAO/tipo_moeda.js')

// Função para inserir um novo tipo de moeda
const inserirTipoMoeda = async function (tipoMoeda) {
    try {
        if (!tipoMoeda.tipo_moeda || tipoMoeda.tipo_moeda.length > 45) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let result = await tipoMoedaDAO.insertTipoMoeda(tipoMoeda)
        return result ? MESSAGE.SUCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para listar todos os tipos de moeda
const listarTipoMoeda = async function () {
    try {
        let result = await tipoMoedaDAO.selectAllTipoMoeda()
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para buscar um tipo de moeda pelo ID
const buscarTipoMoeda = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let result = await tipoMoedaDAO.selectByIdTipoMoeda(id)
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para atualizar um tipo de moeda
const atualizarTipoMoeda = async function (tipoMoeda, id) {
    try {
        if (!tipoMoeda.tipo_moeda || tipoMoeda.tipo_moeda.length > 45 || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let tipoMoedaExistente = await tipoMoedaDAO.selectByIdTipoMoeda(id)
        if (!tipoMoedaExistente) {
            return MESSAGE.ERROR_NOT_FOUND
        }

        tipoMoeda.id = id
        let result = await tipoMoedaDAO.updateTipoMoeda(tipoMoeda)
        return result ? MESSAGE.SUCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para excluir um tipo de moeda
const excluirTipoMoeda = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let tipoMoedaExistente = await tipoMoedaDAO.selectByIdTipoMoeda(id)
        if (!tipoMoedaExistente) {
            return MESSAGE.ERROR_NOT_FOUND
        }

        let result = await tipoMoedaDAO.deleteTipoMoeda(id)
        return result ? MESSAGE.SUCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

module.exports = {
    inserirTipoMoeda,
    listarTipoMoeda,
    buscarTipoMoeda,
    atualizarTipoMoeda,
    excluirTipoMoeda
}
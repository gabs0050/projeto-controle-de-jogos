/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD da plataforma
 * Autor: Gabriel Souza Costa
 * Data: 17/04/2024
 * Versão: 1.0
 *************************************************************************************/

//Importdo arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const plataformaDAO = require('../../model/DAO/plataforma.js')

// Função para inserir uma nova plataforma
const inserirPlataforma = async function (plataforma) {
    try {
        if (!plataforma.nome || plataforma.nome.length > 100) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let result = await plataformaDAO.insertPlataforma(plataforma)
        return result ? MESSAGE.SUCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para listar todas as plataformas
const listarPlataforma = async function () {
    try {
        let result = await plataformaDAO.selectAllPlataforma()
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para buscar uma plataforma pelo ID
const buscarPlataforma = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let result = await plataformaDAO.selectByIdPlataforma(id)
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para atualizar uma plataforma
const atualizarPlataforma = async function (plataforma, id) {
    try {
        if (!plataforma.nome || plataforma.nome.length > 100 || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let plataformaExistente = await plataformaDAO.selectByIdPlataforma(id)
        if (!plataformaExistente) {
            return MESSAGE.ERROR_NOT_FOUND
        }

        plataforma.id = id
        let result = await plataformaDAO.updatePlataforma(plataforma)
        return result ? MESSAGE.SUCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Função para excluir uma plataforma.
const excluirPlataforma = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let plataformaExistente = await plataformaDAO.selectByIdPlataforma(id)
        if (!plataformaExistente) {
            return MESSAGE.ERROR_NOT_FOUND
        }

        let result = await plataformaDAO.deletePlataforma(id)
        return result ? MESSAGE.SUCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

module.exports = {
    inserirPlataforma,
    listarPlataforma,
    buscarPlataforma,
    atualizarPlataforma,
    excluirPlataforma
}
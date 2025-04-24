/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD do sexo
 * Autor: Gabriel Souza Costa
 * Data: 17/04/2024
 * Versão: 1.0
 *************************************************************************************/

//Importdo arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const sexoDAO = require('../../model/DAO/sexo.js')

// Função para inserir um novo sexo
const inserirSexo = async function (sexo) {
    try {
        if (!sexo.sigla || !sexo.nome_sexo || sexo.sigla.length > 1 || sexo.nome_sexo.length > 30) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }

        let result = await sexoDAO.insertSexo(sexo)
        return result ? MESSAGE.SUCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 201 ou 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para listar todos os sexos
const listarSexo = async function () {
    try {
        let result = await sexoDAO.selectAllSexo()
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND // 200 ou 404
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para buscar um sexo pelo ID
const buscarSexo = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await sexoDAO.selectByIdSexo(id)
        return result
            ? { status: true, status_code: 200, data: result }
            : MESSAGE.ERROR_NOT_FOUND; // 200 ou 404
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para atualizar um sexo
const atualizarSexo = async function (sexo, id) {
    try {
        if (!sexo.sigla || !sexo.nome_sexo || sexo.sigla.length > 1 || sexo.nome_sexo.length > 30 || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }

        let sexoExistente = await sexoDAO.selectByIdSexo(id)
        if (!sexoExistente) {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }

        sexo.id = id;
        let result = await sexoDAO.updateSexo(sexo);
        return result ? MESSAGE.SUCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 200 ou 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para excluir um sexo
const excluirSexo = async function (id) {
    try {
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }

        let sexoExistente = await sexoDAO.selectByIdSexo(id)
        if (!sexoExistente) {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }

        let result = await sexoDAO.deleteSexo(id);
        return result ? MESSAGE.SUCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 200 ou 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

module.exports = {
    inserirSexo,
    listarSexo,
    buscarSexo,
    atualizarSexo,
    excluirSexo
}
/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Preços
 * Data: 15/05/2025
 * Autor: Gabriel Souza Costa
 * Versão: 1.0
 *************************************************************************************/

// Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo para realizar o CRUD de dados no Banco de Dados
const precoDAO = require('../../model/DAO/preco.js')

// Função para inserir um novo preço
const inserirPreco = async function (preco, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !preco.valor ||
                !preco.id_jogo ||
                !preco.id_tipo_moeda ||
                isNaN(preco.valor) ||
                isNaN(preco.id_jogo) ||
                isNaN(preco.id_tipo_moeda)
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await precoDAO.insertPreco(preco)

                if (result) {
                    return MESSAGE.SUCESS_CREATED_ITEM // 201
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error('Erro na controller inserirPreco:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um preço
const atualizarPreco = async function (id, preco, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id ||
                !preco.valor ||
                !preco.id_jogo ||
                !preco.id_tipo_moeda ||
                isNaN(id) ||
                isNaN(preco.valor) ||
                isNaN(preco.id_jogo) ||
                isNaN(preco.id_tipo_moeda)
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let precoExistente = await precoDAO.selectByIdPreco(id)

                if (precoExistente) {
                    preco.id = id
                    let result = await precoDAO.updatePreco(preco)

                    if (result) {
                        return MESSAGE.SUCESS_UPDATED_ITEM // 200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error('Erro na controller atualizarPreco:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um preço
const excluirPreco = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let precoExistente = await precoDAO.selectByIdPreco(id)

            if (precoExistente) {
                let result = await precoDAO.deletePreco(id)

                if (result) {
                    return MESSAGE.SUCESS_DELETED_ITEM // 200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        console.error('Erro na controller excluirPreco:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todos os preços
const listarPrecos = async function () {
    try {
        let result = await precoDAO.selectAllPrecos()

        if (result) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                precos: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        console.error('Erro na controller listarPrecos:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para buscar um preço pelo ID
const buscarPreco = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let result = await precoDAO.selectByIdPreco(id)

            if (result) {
                return {
                    status: true,
                    status_code: 200,
                    preco: result
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        console.error('Erro na controller buscarPreco:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirPreco,
    atualizarPreco,
    excluirPreco,
    listarPrecos,
    buscarPreco
}
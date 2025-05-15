/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Avaliações
 * Data: 15/05/2025
 * Autor: Gabriel Souza Costa
 * Versão: 1.0
 *************************************************************************************/

// Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo para realizar o CRUD de dados no Banco de Dados
const avaliacoesDAO = require('../../model/DAO/avaliacoes.js')

// Função para inserir uma nova avaliação
const inserirAvaliacao = async function (avaliacao, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !avaliacao.nota_jogo ||
                !avaliacao.id_jogo ||
                !avaliacao.id_usuario ||
                isNaN(avaliacao.nota_jogo) ||
                isNaN(avaliacao.id_jogo) ||
                isNaN(avaliacao.id_usuario)
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await avaliacoesDAO.insertAvaliacao(avaliacao)

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
        console.error('Erro na controller inserirAvaliacao:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar uma avaliação
const atualizarAvaliacao = async function (id, avaliacao, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id ||
                !avaliacao.nota_jogo ||
                !avaliacao.id_jogo ||
                !avaliacao.id_usuario ||
                isNaN(id) ||
                isNaN(avaliacao.nota_jogo) ||
                isNaN(avaliacao.id_jogo) ||
                isNaN(avaliacao.id_usuario)
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let avaliacaoExistente = await avaliacoesDAO.selectByIdAvaliacao(id)

                if (avaliacaoExistente) {
                    avaliacao.id_avaliacao = id
                    let result = await avaliacoesDAO.updateAvaliacao(avaliacao)

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
        console.error('Erro na controller atualizarAvaliacao:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir uma avaliação
const excluirAvaliacao = async function (id) {
    try {
        if (!id || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let avaliacaoExistente = await avaliacoesDAO.selectByIdAvaliacao(id)

            if (avaliacaoExistente) {
                let result = await avaliacoesDAO.deleteAvaliacao(id)

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
        console.error('Erro na controller excluirAvaliacao:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todas as avaliações
const listarAvaliacoes = async function () {
    try {
        let result = await avaliacoesDAO.selectAllAvaliacoes()

        if (result) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                avaliacoes: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        console.error('Erro na controller listarAvaliacoes:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para buscar uma avaliação por ID
const buscarAvaliacao = async function (id) {
    try {
        if (!id || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let result = await avaliacoesDAO.selectByIdAvaliacao(id)

            if (result) {
                return {
                    status: true,
                    status_code: 200,
                    avaliacao: result
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        console.error('Erro na controller buscarAvaliacao:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarAvaliacoes,
    buscarAvaliacao
}
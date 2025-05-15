/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Desenvolvedora Jogo
 * Data: 15/05/2025
 * Autor: Gabriel Souza Costa
 * Versão: 1.0
 *************************************************************************************/

// Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo para realizar o CRUD de dados no Banco de Dados
const desenvolvedoraJogoDAO = require('../../model/DAO/desenvolvedora_jogo.js')

// Função para inserir um novo relacionamento entre desenvolvedora e jogo
const inserirDesenvolvedoraJogo = async function (desenvolvedoraJogo, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !desenvolvedoraJogo.id_desenvolvedora ||
                !desenvolvedoraJogo.id_jogo ||
                isNaN(desenvolvedoraJogo.id_desenvolvedora) ||
                isNaN(desenvolvedoraJogo.id_jogo)
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await desenvolvedoraJogoDAO.insertDesenvolvedoraJogo(desenvolvedoraJogo)

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
        console.error('Erro na controller inserirDesenvolvedoraJogo:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um relacionamento entre desenvolvedora e jogo
const atualizarDesenvolvedoraJogo = async function (id, desenvolvedoraJogo, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id ||
                !desenvolvedoraJogo.id_desenvolvedora ||
                !desenvolvedoraJogo.id_jogo ||
                isNaN(id) ||
                isNaN(desenvolvedoraJogo.id_desenvolvedora) ||
                isNaN(desenvolvedoraJogo.id_jogo)
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let desenvolvedoraJogoExistente = await desenvolvedoraJogoDAO.selectByIdDesenvolvedoraJogo(id)

                if (desenvolvedoraJogoExistente) {
                    desenvolvedoraJogo.id = id
                    let result = await desenvolvedoraJogoDAO.updateDesenvolvedoraJogo(desenvolvedoraJogo)

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
        console.error('Erro na controller atualizarDesenvolvedoraJogo:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um relacionamento entre desenvolvedora e jogo
const excluirDesenvolvedoraJogo = async function (id) {
    try {
        if (!id || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let desenvolvedoraJogoExistente = await desenvolvedoraJogoDAO.selectByIdDesenvolvedoraJogo(id)

            if (desenvolvedoraJogoExistente) {
                let result = await desenvolvedoraJogoDAO.deleteDesenvolvedoraJogo(id)

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
        console.error('Erro na controller excluirDesenvolvedoraJogo:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todos os relacionamentos entre desenvolvedoras e jogos
const listarDesenvolvedoraJogo = async function () {
    try {
        let result = await desenvolvedoraJogoDAO.selectAllDesenvolvedoraJogo()

        if (result) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                desenvolvedora_jogo: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        console.error('Erro na controller listarDesenvolvedoraJogo:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para buscar um relacionamento entre desenvolvedora e jogo por ID
const buscarDesenvolvedoraJogo = async function (id) {
    try {
        if (!id || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let result = await desenvolvedoraJogoDAO.selectByIdDesenvolvedoraJogo(id)

            if (result) {
                return {
                    status: true,
                    status_code: 200,
                    desenvolvedora_jogo: result
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        console.error('Erro na controller buscarDesenvolvedoraJogo:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirDesenvolvedoraJogo,
    atualizarDesenvolvedoraJogo,
    excluirDesenvolvedoraJogo,
    listarDesenvolvedoraJogo,
    buscarDesenvolvedoraJogo
}
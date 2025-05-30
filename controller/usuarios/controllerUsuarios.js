/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Usuários
 * Data: 15/05/2025
 * Autor: Gabriel Souza Costa
 * Versão: 1.0
 *************************************************************************************/

// Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo para realizar o CRUD de dados no Banco de Dados
const usuariosDAO = require('../../model/DAO/usuarios.js')

// Função para inserir um novo usuário
const inserirUsuario = async function (usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !usuario.nome_usuario ||
                !usuario.email ||
                !usuario.senha ||
                !usuario.tbl_sexo_id
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await usuariosDAO.insertUsuario(usuario)

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
        console.error('Erro na controller inserirUsuario:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um usuário
const atualizarUsuario = async function (id, usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id ||
                !usuario.nome_usuario ||
                !usuario.email ||
                !usuario.senha ||
                !usuario.tbl_sexo_id
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                let usuarioExistente = await usuariosDAO.selectByIdUsuario(id)

                if (usuarioExistente) {
                    usuario.id_usuario = id
                    let result = await usuariosDAO.updateUsuario(usuario)

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
        console.error('Erro na controller atualizarUsuario:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um usuário
const excluirUsuario = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let usuarioExistente = await usuariosDAO.selectByIdUsuario(id)

            if (usuarioExistente) {
                let result = await usuariosDAO.deleteUsuario(id)

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
        console.error('Erro na controller excluirUsuario:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todos os usuários
const listarUsuarios = async function () {
    try {
        let result = await usuariosDAO.selectAllUsuarios()

        if (result) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                usuarios: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        console.error('Erro na controller listarUsuarios:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para buscar um usuário pelo ID
const buscarUsuario = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let result = await usuariosDAO.selectByIdUsuario(id)

            if (result) {
                return {
                    status: true,
                    status_code: 200,
                    usuario: result
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        console.error('Erro na controller buscarUsuario:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuarios,
    buscarUsuario
}
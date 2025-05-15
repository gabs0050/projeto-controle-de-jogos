/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Usuários
 * Data: 15/05/2025
 * Autor: Gabriel Souza Costa
 * Versão: 1.0
 ******************************************************************************************************/

// Import da biblioteca do Prisma Client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// Instancia (cria um objeto a ser utilizado) a biblioteca do Prisma Client
const prisma = new PrismaClient()

// Função para inserir um novo usuário
const insertUsuario = async function (usuario) {
    try {
        let sql = `
            INSERT INTO tbl_usuarios (
                nome_usuario,
                email,
                senha,
                foto_perfil,
                tbl_sexo_id
            ) VALUES (
                '${usuario.nome_usuario}',
                '${usuario.email}',
                '${usuario.senha}',
                '${usuario.foto_perfil}',
                ${usuario.tbl_sexo_id}
            )
        `

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error('Erro no insertUsuario:', error)
        return false
    }
}

// Função para atualizar um usuário existente
const updateUsuario = async function (usuario) {
    try {
        let sql = `
            UPDATE tbl_usuarios
            SET
                nome_usuario = '${usuario.nome_usuario}',
                email = '${usuario.email}',
                senha = '${usuario.senha}',
                foto_perfil = '${usuario.foto_perfil}',
                tbl_sexo_id = ${usuario.tbl_sexo_id}
            WHERE id_usuario = ${usuario.id_usuario}
        `

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error('Erro no updateUsuario:', error)
        return false
    }
}

// Função para excluir um usuário existente
const deleteUsuario = async function (id) {
    try {
        let sql = `DELETE FROM tbl_usuarios WHERE id_usuario = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error('Erro no deleteUsuario:', error)
        return false
    }
}

// Função para retornar todos os usuários existentes
const selectAllUsuarios = async function () {
    try {
        let sql = `SELECT * FROM tbl_usuarios ORDER BY id_usuario DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result : false
    } catch (error) {
        console.error('Erro no selectAllUsuarios:', error)
        return false
    }
}

// Função para buscar um usuário pelo ID
const selectByIdUsuario = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_usuarios WHERE id_usuario = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result[0] : false
    } catch (error) {
        console.error('Erro no selectByIdUsuario:', error)
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectByIdUsuario
}
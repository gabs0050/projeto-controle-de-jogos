/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente as avaliações no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Função para inserir uma nova avaliação
const insertAvaliacao = async function (avaliacao) {
    try {
        let sql = `
            INSERT INTO tbl_avaliacoes (nota_jogo, comentario, data_avaliacao, id_jogo, id_usuario)
            VALUES (${avaliacao.nota_jogo}, '${avaliacao.comentario}', '${avaliacao.data_avaliacao}', ${avaliacao.id_jogo}, ${avaliacao.id_usuario})
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error('Erro no insertAvaliacao:', error)
        return false
    }
}

// Função para atualizar uma avaliação
const updateAvaliacao = async function (avaliacao) {
    try {
        let sql = `
            UPDATE tbl_avaliacoes
            SET nota_jogo = ${avaliacao.nota_jogo},
                comentario = '${avaliacao.comentario}',
                data_avaliacao = '${avaliacao.data_avaliacao}',
                id_jogo = ${avaliacao.id_jogo},
                id_usuario = ${avaliacao.id_usuario}
            WHERE id_avaliacao = ${avaliacao.id_avaliacao}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error('Erro no updateAvaliacao:', error)
        return false
    }
}

// Função para excluir uma avaliação
const deleteAvaliacao = async function (id) {
    try {
        let sql = `DELETE FROM tbl_avaliacoes WHERE id_avaliacao = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error('Erro no deleteAvaliacao:', error)
        return false
    }
}

// Função para listar todas as avaliações
const selectAllAvaliacoes = async function () {
    try {
        let sql = `SELECT * FROM tbl_avaliacoes ORDER BY id_avaliacao DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.error('Erro no selectAllAvaliacoes:', error)
        return false
    }
}

// Função para buscar uma avaliação por ID
const selectByIdAvaliacao = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_avaliacoes WHERE id_avaliacao = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.error('Erro no selectByIdAvaliacao:', error)
        return false
    }
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacoes,
    selectByIdAvaliacao
}
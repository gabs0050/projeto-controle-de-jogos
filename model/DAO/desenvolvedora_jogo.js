/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a desenvolvedora_jogo no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Função para inserir um novo relacionamento entre desenvolvedora e jogo
const insertDesenvolvedoraJogo = async function (desenvolvedoraJogo) {
    try {
        let sql = `
            INSERT INTO tbl_desenvolvedora_jogo (id_desenvolvedora, id_jogo)
            VALUES (${desenvolvedoraJogo.id_desenvolvedora}, ${desenvolvedoraJogo.id_jogo})
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error('Erro no insertDesenvolvedoraJogo:', error)
        return false
    }
}

// Função para atualizar um relacionamento entre desenvolvedora e jogo
const updateDesenvolvedoraJogo = async function (desenvolvedoraJogo) {
    try {
        let sql = `
            UPDATE tbl_desenvolvedora_jogo
            SET id_desenvolvedora = ${desenvolvedoraJogo.id_desenvolvedora},
                id_jogo = ${desenvolvedoraJogo.id_jogo}
            WHERE id = ${desenvolvedoraJogo.id}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error('Erro no updateDesenvolvedoraJogo:', error)
        return false
    }
}

// Função para excluir um relacionamento entre desenvolvedora e jogo
const deleteDesenvolvedoraJogo = async function (id) {
    try {
        let sql = `DELETE FROM tbl_desenvolvedora_jogo WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error('Erro no deleteDesenvolvedoraJogo:', error)
        return false
    }
}

// Função para listar todos os relacionamentos entre desenvolvedoras e jogos
const selectAllDesenvolvedoraJogo = async function () {
    try {
        let sql = `SELECT * FROM tbl_desenvolvedora_jogo ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.error('Erro no selectAllDesenvolvedoraJogo:', error)
        return false
    }
}

// Função para buscar um relacionamento entre desenvolvedora e jogo por ID
const selectByIdDesenvolvedoraJogo = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_desenvolvedora_jogo WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.error('Erro no selectByIdDesenvolvedoraJogo:', error)
        return false
    }
}

module.exports = {
    insertDesenvolvedoraJogo,
    updateDesenvolvedoraJogo,
    deleteDesenvolvedoraJogo,
    selectAllDesenvolvedoraJogo,
    selectByIdDesenvolvedoraJogo
}
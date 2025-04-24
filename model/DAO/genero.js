/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao genero no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Função para inserir um novo gênero
const insertGenero = async function (genero) {
    try {
        let sql = `INSERT INTO tbl_genero (nome) VALUES ('${genero.nome}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Função para listar todos os gêneros
const selectAllGenero = async function () {
    try {
        let sql = `SELECT * FROM tbl_genero ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

// Função para buscar um gênero pelo ID
const selectByIdGenero = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_genero WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

// Função para atualizar um gênero
const updateGenero = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero SET nome = '${genero.nome}' WHERE id = ${genero.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Função para excluir um gênero
const deleteGenero = async function (id) {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    selectAllGenero,
    selectByIdGenero,
    updateGenero,
    deleteGenero
}
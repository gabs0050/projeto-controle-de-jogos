/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a plataforma no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

// Função para inserir uma nova plataforma
const insertPlataforma = async function (plataforma) {
    try {
        let sql = `INSERT INTO tbl_plataforma (nome) VALUES ('${plataforma.nome}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Função para listar todas as plataformas
const selectAllPlataforma = async function () {
    try {
        let sql = `SELECT * FROM tbl_plataforma ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

// Função para buscar uma plataforma pelo ID
const selectByIdPlataforma = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_plataforma WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

// Função para atualizar uma plataforma
const updatePlataforma = async function (plataforma) {
    try {
        let sql = `UPDATE tbl_plataforma SET nome = '${plataforma.nome}' WHERE id = ${plataforma.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Função para excluir uma plataforma
const deletePlataforma = async function (id) {
    try {
        let sql = `DELETE FROM tbl_plataforma WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertPlataforma,
    selectAllPlataforma,
    selectByIdPlataforma,
    updatePlataforma,
    deletePlataforma
}
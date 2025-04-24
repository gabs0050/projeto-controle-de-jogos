/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao tipo_moeda no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

// Função para inserir um novo tipo de moeda
const insertTipoMoeda = async function (tipoMoeda) {
    try {
        let sql = `INSERT INTO tbl_tipo_moeda (tipo_moeda) VALUES ('${tipoMoeda.tipo_moeda}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Função para listar todos os tipos de moeda
const selectAllTipoMoeda = async function () {
    try {
        let sql = `SELECT * FROM tbl_tipo_moeda ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

// Função para buscar um tipo de moeda pelo ID
const selectByIdTipoMoeda = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_tipo_moeda WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

// Função para atualizar um tipo de moeda
const updateTipoMoeda = async function (tipoMoeda) {
    try {
        let sql = `UPDATE tbl_tipo_moeda SET tipo_moeda = '${tipoMoeda.tipo_moeda}' WHERE id = ${tipoMoeda.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Função para excluir um tipo de moeda
const deleteTipoMoeda = async function (id) {
    try {
        let sql = `DELETE FROM tbl_tipo_moeda WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertTipoMoeda,
    selectAllTipoMoeda,
    selectByIdTipoMoeda,
    updateTipoMoeda,
    deleteTipoMoeda
}
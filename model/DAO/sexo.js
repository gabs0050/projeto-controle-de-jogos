/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao sexo no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

// Função para inserir um novo sexo
const insertSexo = async function (sexo) {
    try {
        let sql = `INSERT INTO tbl_sexo (sigla, nome_sexo) VALUES ('${sexo.sigla}', '${sexo.nome_sexo}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
};

// Função para listar todos os sexos
const selectAllSexo = async function () {
    try {
        let sql = `SELECT * FROM tbl_sexo ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false;
    } catch (error) {
        return false
    }
};

// Função para buscar um sexo pelo ID
const selectByIdSexo = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_sexo WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false;
    }
};

// Função para atualizar um sexo
const updateSexo = async function (sexo) {
    try {
        let sql = `UPDATE tbl_sexo SET sigla = '${sexo.sigla}', nome_sexo = '${sexo.nome_sexo}' WHERE id = ${sexo.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false;
    } catch (error) {
        return false
    }
};

// Função para excluir um sexo
const deleteSexo = async function (id) {
    try {
        let sql = `DELETE FROM tbl_sexo WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertSexo,
    selectAllSexo,
    selectByIdSexo,
    updateSexo,
    deleteSexo
};
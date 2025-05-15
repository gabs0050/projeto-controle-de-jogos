/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Preços
 * Data: 15/05/2025
 * Autor: Gabriel Souza Costa
 * Versão: 1.0
 ******************************************************************************************************/

// Import da biblioteca do Prisma Client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// Instancia (cria um objeto a ser utilizado) a biblioteca do Prisma Client
const prisma = new PrismaClient()

// Função para inserir um novo preço
const insertPreco = async function (preco) {
    try {
        let sql = `
            INSERT INTO tbl_preco (
                valor,
                id_jogo,
                id_tipo_moeda
            ) VALUES (
                ${preco.valor},
                ${preco.id_jogo},
                ${preco.id_tipo_moeda}
            )
        `

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error('Erro no insertPreco:', error)
        return false
    }
}

// Função para atualizar um preço existente
const updatePreco = async function (preco) {
    try {
        let sql = `
            UPDATE tbl_preco
            SET
                valor = ${preco.valor},
                id_jogo = ${preco.id_jogo},
                id_tipo_moeda = ${preco.id_tipo_moeda}
            WHERE id = ${preco.id}
        `

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error('Erro no updatePreco:', error)
        return false
    }
}

// Função para excluir um preço existente
const deletePreco = async function (id) {
    try {
        let sql = `DELETE FROM tbl_preco WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error('Erro no deletePreco:', error)
        return false
    }
}

// Função para retornar todos os preços existentes
const selectAllPrecos = async function () {
    try {
        let sql = `SELECT * FROM tbl_preco ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result : false
    } catch (error) {
        console.error('Erro no selectAllPrecos:', error)
        return false
    }
}

// Função para buscar um preço pelo ID
const selectByIdPreco = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_preco WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result[0] : false
    } catch (error) {
        console.error('Erro no selectByIdPreco:', error)
        return false
    }
}

module.exports = {
    insertPreco,
    updatePreco,
    deletePreco,
    selectAllPrecos,
    selectByIdPreco
}
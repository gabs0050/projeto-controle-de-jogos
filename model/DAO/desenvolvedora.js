/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a desenvolvedora no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//Função que insere uma nova desenvolvedora ao banco de dados
const insertDesenvolvedora = async function (desenvolvedora) {
    try {

        let sql = `insert into tbl_desenvolvedora (
                                            nome_desenvolvedora,
                                            descricao_desenvolvedora,
                                            logo_desenvolvedora
                                        ) values (
                                            '${desenvolvedora.nome_desenvolvedora}',
                                            '${desenvolvedora.descricao_desenvolvedora}',
                                            '${desenvolvedora.logo_desenvolvedora}'
                                        )`

        //Executa o script SQL no BD e AGUARDA o retorno do BD
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        // console.log(error)
        return false
    }
}

//Função para atualizar no Banco de Dados uma nova desenvolvedora
const updateDesenvolvedora = async function (desenvolvedora) {
    try {
        let sql = `UPDATE tbl_desenvolvedora SET 
                        nome_desenvolvedora = '${desenvolvedora.nome_desenvolvedora}',
                        descricao_desenvolvedora = '${desenvolvedora.descricao_desenvolvedora || ''}',
                        logo_desenvolvedora = '${desenvolvedora.logo_desenvolvedora || ''}'
                   WHERE id_desenvolvedora = ${desenvolvedora.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir no Banco de Dados uma nova desenvolvedora
const deleteDesenvolvedora = async function (id) {
    try {
        // Corrige o nome da coluna no SQL
        let sql = `delete from tbl_desenvolvedora where id_desenvolvedora = ${id}`

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Erro no deleteDesenvolvedora:', error)
        return false
    }
}

//Função para retornar do Banco de Dados uma lista das desenvolvedoras
const selectAllDesenvolvedora = async function () {
    try {
        //Script SQL para retornar os dados do BD
        let sql = `select * from tbl_desenvolvedora order by id_desenvolvedora desc`

        //Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para buscar no Banco de Dados uma desenvolvedora pelo ID
const selectByIdDesenvolvedora = async function (id) {
    try {
        //Script SQL para retornar os dados do BD
        let sql = `select * from tbl_desenvolvedora where id_desenvolvedora = ${id}`

        //Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDesenvolvedora,
    updateDesenvolvedora,
    deleteDesenvolvedora,
    selectAllDesenvolvedora,
    selectByIdDesenvolvedora
}
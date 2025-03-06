/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a jogos no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados um novo jogo
const insertJogo =  async function(jogo){
    try {

    let sql = `insert into tbl_jogo (
                                        nome,
                                        data_lancamento,
                                        versao,
                                        tamanho,
                                        descricao,
                                        foto_capa,
                                        link
                                    ) values (
                                        '${jogo.nome}',
                                        '${jogo.data_lancamento}',
                                        '${jogo.versao}',
                                        '${jogo.tamanho}',
                                        '${jogo.descricao}',
                                        '${jogo.foto_capa}',
                                        '${jogo.link}'
                                    )`

    //Executa o script SQL no BD e AGUARDA o retorno do BD
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    } catch (error) {
    // console.log(error)
        return false
    }
}

//Função para atualizar no Banco de Dados um novo jogo
const updateJogo =  async function(){

}

//Função para excluir no Banco de Dados um novo jogo
const deleteJogo = async function(id){
    try {
        let sql = `delete from tbl_jogo where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de jogos
const selectAllJogo =  async function(){
    try{
        //Script SQL para retornar os dados do BD
        let sql = `select * from tbl_jogo order by id desc`

        //Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para buscar no Banco de Dados um jogo pelo ID
const selectByIdJogo = async function (id) {
    try {
        let sql = `select * from tbl_jogo where id = ${id}`
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
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}
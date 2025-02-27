/*************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a jogos no Banco de Dados
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Função para inserir no Banco de Dados um novo jogo
const insertJogo =  async function(jogo){
    //Instância da classe do prisma client para gerar um objeto
    const prisma = new PrismaClient()

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
}

//Função para atualizar no Banco de Dados um novo jogo
const updateJogo =  async function(){

}

//Função para excluir no Banco de Dados um novo jogo
const deleteJogo =  async function(){

}

//Função para retornar do Banco de Dados uma lista de jogos
const selectAllJogo =  async function(){

}

//Função para buscar no Banco de Dados um jogo pelo ID
const selectByIdJogo =  async function(){

}

module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo,
}
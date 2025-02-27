/*************************************************************************************
 * Objetivo: Arquivo de padronização de mansagens e status code para o projeto.
 * Autor: Gabriel Souza Costa
 * Data: 20/02/2024
 * Versão: 1.0
 *************************************************************************************/

/**************************** MENSAGENS DE ERRO *****************************/
const ERROR_REQUIRED_FIELDS     = {status: true, status_code: 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada !!!"}
const ERROR_INTERNAL_SERVER     = {status: true, status_code: 500, message: "Não foi possível processar a requisição, pois ocorreram erros internos no servidor !!!"}

/**************************** MENSAGENS DE SUCESSO*****************************/
const SUCESS_CREATED_ITEM        = {status: true, status_code: 201, message: "Item criado com sucesso !!!"}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER
}
/*************************************************************************************
 * Objetivo: Arquivo de padronização de mansagens e status code para o projeto.
 * Autor: Gabriel Souza Costa
 * Data: 20/02/2024
 * Versão: 1.0
 *************************************************************************************/

/**************************** MENSAGENS DE ERRO *****************************/
const ERROR_REQUIRED_FIELDS               = {status: false, status_code: 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada!!!"}
const ERROR_INTERNAL_SERVER_CONTROLER     = {status: false, status_code: 500, message: "Não foi possível processar a requisição, pois ocorreram erros internos no servidor da CONTROLLER!!!"}
const ERROR_INTERNAL_SERVER_MODEL         = {status: false, status_code: 500, message: "Não foi possível processar a requisição, pois ocorreram erros internos no servidor da MODEL!!!"}
const ERROR_CONTENT_TYPE                  = {status: false, status_code: 415, message: "Não foi possível processar a requisição, pois, o formato de dados encaminhado não é suportado pelo servidor. Favor encaminhar apenas JSON!!"}
const ERROR_NOT_FOUND                     = {status: false, status_code: 404, message: "Não foram encontrados itens para retornar!!!"}
/**************************** MENSAGENS DE SUCESSO*****************************/
const SUCESS_CREATED_ITEM        = {status: true, status_code: 201, message: "Item criado com sucesso !!!"}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_CONTROLER,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND
}
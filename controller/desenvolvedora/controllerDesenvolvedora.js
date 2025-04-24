/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD da desenvolvedora
 * Autor: Gabriel Souza Costa
 * Data: 17/04/2024
 * Versão: 1.0
 *************************************************************************************/

//Importdo arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const desenvolvedoraDAO = require('../../model/DAO/desenvolvedora.js')

//Função para inserir um novo desenvolvedora
const inserirDesenvolvedora = async function (desenvolvedora, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                desenvolvedora.nome_desenvolvedora === undefined || desenvolvedora.nome_desenvolvedora === '' || desenvolvedora.nome_desenvolvedora === null || desenvolvedora.nome_desenvolvedora.length > 100 ||
                (desenvolvedora.descricao_desenvolvedora && desenvolvedora.descricao_desenvolvedora.length > 250) || // Opcional, mas deve respeitar o limite
                (desenvolvedora.logo_desenvolvedora && desenvolvedora.logo_desenvolvedora.length > 250) // Opcional, mas deve respeitar o limite
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Encaminha os dados do novo desenvolvedora para ser inserido no BD
                let resultDesenvolvedora = await desenvolvedoraDAO.insertDesenvolvedora(desenvolvedora);

                if (resultDesenvolvedora)
                    return MESSAGE.SUCESS_CREATED_ITEM; // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER; // 500
    }
};

//Função para atualizar um desenvolvedora
const atualizarDesenvolvedora = async function (desenvolvedora, id, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                desenvolvedora.nome_desenvolvedora === undefined || desenvolvedora.nome_desenvolvedora === '' || desenvolvedora.nome_desenvolvedora === null || desenvolvedora.nome_desenvolvedora.length > 100 ||
                (desenvolvedora.descricao_desenvolvedora && desenvolvedora.descricao_desenvolvedora.length > 250) || // Opcional, mas deve respeitar o limite
                (desenvolvedora.logo_desenvolvedora && desenvolvedora.logo_desenvolvedora.length > 250) || // Opcional, mas deve respeitar o limite
                id === undefined || id === '' || id === null || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }

            // Verifica se o ID existe no banco de dados
            let resultDesenvolvedora = await desenvolvedoraDAO.selectByIdDesenvolvedora(parseInt(id))

            if (resultDesenvolvedora) {
                // Atualiza os dados da desenvolvedora
                desenvolvedora.id = parseInt(id)
                let result = await desenvolvedoraDAO.updateDesenvolvedora(desenvolvedora)

                if (result) {
                    return MESSAGE.SUCESS_UPDATED_ITEM // 200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

//Função para excluir um desenvolvedora
const excluirDesenvolvedora = async function(id){
    try {
        // Verifica se o ID é um número válido
        if (isNaN(id) || id == '' || id == undefined || id == null || id <= 0) {
            return { status: false, status_code: 400, message: "ID inválido. O ID deve ser um número válido." }
        }

        // Verifica se o desenvolvedora existe
        let resultDesenvolvedora = await buscarDesenvolvedora(parseInt(id))
        
        if(resultDesenvolvedora.status_code == 200){
            // Delete
            let result = await desenvolvedoraDAO.deleteDesenvolvedora(parseInt(id))

            if(result){
                return MESSAGE.SUCESS_DELETED_ITEM //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
            
        } else if(resultDesenvolvedora.status_code == 404){
            return MESSAGE.ERROR_NOT_FOUND //404
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
    }
}

//Função para retornar todos os jogos
const listarDesenvolvedora = async function(){
    try {
    let dadosDesenvolvedora = {}
    //Chama a função para retornar os dados do desenvolvedora
    let resultDesenvolvedora = await desenvolvedoraDAO.selectAllDesenvolvedora()

        if (resultDesenvolvedora != false || typeof (resultDesenvolvedora) == 'object') {

    if(resultDesenvolvedora.length > 0){

         //Cria um objeto do tipo JSON para retornar a lista de jogos
        dadosDesenvolvedora.status = true
        dadosDesenvolvedora.status_code = 200
        dadosDesenvolvedora.items = resultDesenvolvedora.length
        dadosDesenvolvedora.desenvolvedora = resultDesenvolvedora
        
        return dadosDesenvolvedora //200
    }else{
        return MESSAGE.ERROR_NOT_FOUND //404
    }
}else{
    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
}

    } catch(error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
    }



}

//Função para buscar um desenvolvedora
const buscarDesenvolvedora = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosDesenvolvedora = {}

            // Chama a função para retornar os dados do desenvolvedora pelo ID
            let resultDesenvolvedora = await desenvolvedoraDAO.selectByIdDesenvolvedora(parseInt(id))

            if (resultDesenvolvedora != false && typeof resultDesenvolvedora == 'object') {
                // Cria um objeto do tipo JSON para retornar os dados do desenvolvedora
                dadosDesenvolvedora.status = true
                dadosDesenvolvedora.status_code = 200
                dadosDesenvolvedora.desenvolvedora = resultDesenvolvedora

                return dadosDesenvolvedora // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

module.exports = {
    inserirDesenvolvedora,
    atualizarDesenvolvedora,
    excluirDesenvolvedora,
    listarDesenvolvedora,
    buscarDesenvolvedora
}
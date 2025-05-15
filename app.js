/*********************************************************************************************
 
* Objetivo: API referente ao projeto de controle de jogos
 * Autor: Gabriel Souza Costa
 * Data: 13/02/2024
 * Versão: 1.0
 * Observação:
 *********** Para configurar e instalar a API, precisamos das seguintes bibliotecas:
 *                 express             npm install express --save
 *                 cors                npm install cors --save
 *                 body-parser         npm install body-parser --save
 *
 *********** Para configurar e Instalar o acesso ao Banco de Dados precisamos:
                   prisma              npm install prisma --save (Conexão com o BD)
                   prisma/client       npm install @prisma/client --save (Executa scripts no BD)
*
*** Após a instalação do prisma e do prisma client, devemos:
*                 npx prisma init   (Inicializa o prisma no projeto)

    Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
        npx prisma migrate dev
 ********************************************************************************************/

//import das bibliotecas para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Import das controllers para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')
const controllerDesenvolvedora = require('./controller/desenvolvedora/controllerDesenvolvedora.js')
const controllerSexo = require('./controller/sexo/controllerSexo.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerPlataforma = require('./controller/plataforma/controllerPlataforma.js')
const controllerTipoMoeda = require('./controller/tipo moeda/controllerTipoMoeda.js')
const controllerUsuarios = require('./controller/usuarios/controllerUsuarios.js')
const controllerPreco = require('./controller/preco/controllerPreco.js')


//Estabelecendo formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Configurações do cors
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

/*********************** tbl_jogo *************************/
//EndPoint para criar um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)
    
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors (), async function (request, response){
    //Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint que busca jogos por ID
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    // Extrai o ID do parâmetro da URL
    let idJogo = request.params.id

    // Chama a função para buscar o jogo pelo ID
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint que deleta jogos por ID
app.delete('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    // Extrai o ID do parâmetro da URL
    let idJogo = request.params.id

    // Chama a função para excluir o jogo pelo ID
    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint que atualiza o jogo
app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idJogo = request.params.id
    //Recebe os dados do jogo encaminhado do body da requisição
    let dadosBody = request.body

    let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

/*********************** tbl_desenvolvedora *************************/

//EndPoint para criar uma desenvolvedora no BD
app.post('/v1/controle-jogos/desenvolvedora', cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultDesenvolvedora = await controllerDesenvolvedora.inserirDesenvolvedora(dadosBody, contentType)
    
    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/desenvolvedora', cors (), async function (request, response){
    //Chama a função para listar as desenvolvedoras
    let resultDesenvolvedora = await controllerDesenvolvedora.listarDesenvolvedora()

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

//EndPoint que busca desenvolvedora por ID
app.get('/v1/controle-jogos/desenvolvedora/:id', cors(), async function (request, response) {
    // Extrai o ID do parâmetro da URL
    let idDesenvolvedora = request.params.id

    // Chama a função para buscar a desenvolvedora pelo ID
    let resultDesenvolvedora = await controllerDesenvolvedora.buscarDesenvolvedora(idDesenvolvedora)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

//EndPoint que deleta desenvolvedora por ID
app.delete('/v1/controle-jogos/desenvolvedora/:id', cors(), async function (request, response) {
    // Extrai o ID do parâmetro da URL
    let idDesenvolvedora = request.params.id

    // Chama a função para excluir a desenvolvedora pelo ID
    let resultDesenvolvedora = await controllerDesenvolvedora.excluirDesenvolvedora(idDesenvolvedora)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

//EndPoint que atualiza a desenvolvedora
app.put('/v1/controle-jogos/desenvolvedora/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da desenvolvedora
    let idDesenvolvedora = request.params.id
    //Recebe os dados da desenvolvedora encaminhado do body da requisição
    let dadosBody = request.body

    // Chama a função correta da controllerDesenvolvedora
    let resultDesenvolvedora = await controllerDesenvolvedora.atualizarDesenvolvedora(dadosBody, idDesenvolvedora, contentType)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

/*********************** tbl_sexo *************************/

// Endpoint para inserir um novo sexo
app.post('/v1/controle-jogos/sexo', bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let result = await controllerSexo.inserirSexo(dadosBody)
    response.status(result.status_code).json(result)
})

// Endpoint para listar todos os sexos
app.get('/v1/controle-jogos/sexo', async (request, response) => {
    let result = await controllerSexo.listarSexo()
    response.status(result.status_code).json(result)
})

// Endpoint para buscar um sexo por ID
app.get('/v1/controle-jogos/sexo/:id', async (request, response) => {
    let id = parseInt(request.params.id);
    let result = await controllerSexo.buscarSexo(id)
    response.status(result.status_code).json(result)
})

// Endpoint para atualizar um sexo
app.put('/v1/controle-jogos/sexo/:id', bodyParserJSON, async (request, response) => {
    let id = parseInt(request.params.id);
    let dadosBody = request.body;
    let result = await controllerSexo.atualizarSexo(dadosBody, id)
    response.status(result.status_code).json(result)
})

// Endpoint para excluir um sexo
app.delete('/v1/controle-jogos/sexo/:id', async (request, response) => {
    let id = parseInt(request.params.id);
    let result = await controllerSexo.excluirSexo(id)
    response.status(result.status_code).json(result)
})

/*********************** tbl_genero *************************/

// Endpoint para inserir um novo genero
app.post('/v1/controle-jogos/genero', bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let result = await controllerGenero.inserirGenero(dadosBody)
    response.status(result.status_code).json(result)
})

// Endpoint para listar todos os generos
app.get('/v1/controle-jogos/genero', async (request, response) => {
    let result = await controllerGenero.listarGenero()
    response.status(result.status_code).json(result)
})

// Endpoint para buscar um genero por ID
app.get('/v1/controle-jogos/genero/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerGenero.buscarGenero(id)
    response.status(result.status_code).json(result)
})

// Endpoint para atualizar um genero
app.put('/v1/controle-jogos/genero/:id', bodyParserJSON, async (request, response) => {
    let id = parseInt(request.params.id)
    let dadosBody = request.body
    let result = await controllerGenero.atualizarGenero(dadosBody, id)
    response.status(result.status_code).json(result)
})

// Endpoint para excluir um genero
app.delete('/v1/controle-jogos/genero/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code).json(result)
})

/*********************** tbl_plataforma *************************/

// Endpoint para inserir uma nova plataforma
app.post('/v1/controle-jogos/plataforma', bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let result = await controllerPlataforma.inserirPlataforma(dadosBody)
    response.status(result.status_code).json(result)
})

// Endpoint para listar todas as plataformas
app.get('/v1/controle-jogos/plataforma', async (request, response) => {
    let result = await controllerPlataforma.listarPlataforma()
    response.status(result.status_code).json(result)
})

// Endpoint para buscar uma plataforma por ID
app.get('/v1/controle-jogos/plataforma/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerPlataforma.buscarPlataforma(id)
    response.status(result.status_code).json(result)
})

// Endpoint para atualizar uma plataforma
app.put('/v1/controle-jogos/plataforma/:id', bodyParserJSON, async (request, response) => {
    let id = parseInt(request.params.id)
    let dadosBody = request.body
    let result = await controllerPlataforma.atualizarPlataforma(dadosBody, id)
    response.status(result.status_code).json(result)
})

// Endpoint para excluir uma plataforma
app.delete('/v1/controle-jogos/plataforma/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerPlataforma.excluirPlataforma(id)
    response.status(result.status_code).json(result)
})

/*********************** tbl_tipo_moeda *************************/

// Endpoint para inserir um novo tipo de moeda
app.post('/v1/controle-jogos/tipo-moeda', bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let result = await controllerTipoMoeda.inserirTipoMoeda(dadosBody)
    response.status(result.status_code).json(result)
})

// Endpoint para listar todos os tipos de moeda
app.get('/v1/controle-jogos/tipo-moeda', async (request, response) => {
    let result = await controllerTipoMoeda.listarTipoMoeda()
    response.status(result.status_code).json(result)
})

// Endpoint para buscar um tipo de moeda por ID
app.get('/v1/controle-jogos/tipo-moeda/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerTipoMoeda.buscarTipoMoeda(id)
    response.status(result.status_code).json(result)
})

// Endpoint para atualizar um tipo de moeda
app.put('/v1/controle-jogos/tipo-moeda/:id', bodyParserJSON, async (request, response) => {
    let id = parseInt(request.params.id)
    let dadosBody = request.body
    let result = await controllerTipoMoeda.atualizarTipoMoeda(dadosBody, id)
    response.status(result.status_code).json(result)
})

// Endpoint para excluir um tipo de moeda
app.delete('/v1/controle-jogos/tipo-moeda/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerTipoMoeda.excluirTipoMoeda(id)
    response.status(result.status_code).json(result)
})

/*********************** tbl_usuario *************************/

// Endpoint para inserir um novo usuário
app.post('/v1/controle-jogos/usuarios', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerUsuarios.inserirUsuario(dadosBody, contentType)
    response.status(result.status_code).json(result)
})

// Endpoint para listar todos os usuários
app.get('/v1/controle-jogos/usuarios', async (request, response) => {
    let result = await controllerUsuarios.listarUsuarios()
    response.status(result.status_code).json(result)
})

// Endpoint para buscar um usuário por ID
app.get('/v1/controle-jogos/usuarios/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerUsuarios.buscarUsuario(id)
    response.status(result.status_code).json(result)
})

// Endpoint para atualizar um usuário
app.put('/v1/controle-jogos/usuarios/:id', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const id = parseInt(request.params.id)
    const dadosBody = request.body

    const result = await controllerUsuarios.atualizarUsuario(id, dadosBody, contentType)
    response.status(result.status_code).json(result)
})

// Endpoint para excluir um usuário
app.delete('/v1/controle-jogos/usuarios/:id', async (request, response) => {
    let id = parseInt(request.params.id)
    let result = await controllerUsuarios.excluirUsuario(id)
    response.status(result.status_code).json(result)
})

/*********************** tbl_preco *************************/
// Endpoint para inserir um novo preço
app.post('/v1/controle-jogos/preco', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerPreco.inserirPreco(dadosBody, contentType)
    response.status(result.status_code).json(result)
})

// Endpoint para listar todos os preços
app.get('/v1/controle-jogos/preco', cors(), async (request, response) => {
    const result = await controllerPreco.listarPrecos()
    response.status(result.status_code).json(result)
})

// Endpoint para buscar um preço por ID
app.get('/v1/controle-jogos/preco/:id', cors(), async (request, response) => {
    const id = parseInt(request.params.id)

    const result = await controllerPreco.buscarPreco(id)
    response.status(result.status_code).json(result)
})

// Endpoint para atualizar um preço
app.put('/v1/controle-jogos/preco/:id', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const id = parseInt(request.params.id)
    const dadosBody = request.body

    const result = await controllerPreco.atualizarPreco(id, dadosBody, contentType)
    response.status(result.status_code).json(result)
})

// Endpoint para excluir um preço
app.delete('/v1/controle-jogos/preco/:id', cors(), async (request, response) => {
    const id = parseInt(request.params.id)

    const result = await controllerPreco.excluirPreco(id)
    response.status(result.status_code).json(result)
})

//Inicia o servidor na porta 8080
app.listen(8080, function(){
    console.log('API aguardando Requisições...')
})
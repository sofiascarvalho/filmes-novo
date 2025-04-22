/***************************************************************
 * objetivo: criar uma API para realizar o CRUD do sistema de controle de filmes
 * data: 11/02/2025
 * autor: sofia
 * versao: 1.0
 * observacao:
 *      para criar a API precisamos instalar:
 *          express         npm install express --save
 *          cors            npm install cors --save
 *          body-parser     npm install body-parser --save
 * 
 *      para criar a integracao com o banco de dados precisamos instalar:
 *          prisma          npm install prisma --save (para fazer a conexao com o banco de dados)
 *          prisma/client   npm install @prisma/client --save (para rodar os scripts SQL)
 * 
 *      após a instalação do prisma e prisma/client, devemos:
 *          npx prisma init
 *      você devera configurar o arquivo .env e schema.prisma comas credenciais do BD
 *      apos essa configuracao devera rodar o seguinte comando:
 *          npx prisma migrate dev
**********************************************************************************/

//import das biblitecas para configurar a API
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

//manipular o body da requisicao para chegar apenas JSON
const bodyParserJSON=bodyParser.json()

//cria um objeto app com referencias do express para criar a API
const app=express()

//configuracoes de acesso do CORS para a API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})


/*************************************FILMES********************************************/


const controllerFilme=require('./controller/filme/controllerFilme')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    //recebe do body da requisicao, os dados encaminhados
    let dadosBody=request.body
    let resultFilme=await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})


app.get('/v1/controle-filmes/filme', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultFilme=await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})


app.get('/v1/controle-filmes/filme/:id', cors(), async function (request, response){
//recebe o id da requisicao
    let idFilme=request.params.id

    let resultFilme=await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})


app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    let idFilme=request.params.id

    let resultFilme=await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisicao
    let contentType=request.headers['content-type']

    //recebe o id da requisicao
    let idFilme=request.params.id

    //recebe os dados da requisicao pelo body
    let dadosBody=request.body

    let resultFilme=await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})





/*************************************CLASSIFICACAO********************************************/

const controllerClassificacao=require('./controller/classificacao/controllerClassificação.js')

app.post('/v1/controle-classificacoes/classificacao', cors(), bodyParserJSON, async function (request, response) {
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultClass=await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(resultClass.status_code)
    response.json(resultClass)
})

app.get('/v1/controle-classificacoes/classificacao', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultClass=await controllerClassificacao.selectAllClassificacao()

    response.status(resultClass.status_code)
    response.json(resultClass)
})

app.get('/v1/controle-classificacoes/classificacao/:id', cors(), async function (request, response){
    //recebe o id da requisicao
        let idClass=request.params.id
    
        let resultClass=await controllerClassificacao.selectByIdClassificacao(idClass)
    
        response.status(resultClass.status_code)
        response.json(resultClass)
    })
    
    
app.delete('/v1/controle-classificacoes/classificacao/:id', cors(), async function (request, response) {
    let idClass=request.params.id
    
    let resultClass=await controllerClassificacao.deleteClassificacao(idClass)
    
    response.status(resultClass.status_code)
    response.json(resultClass)
})
    
app.put('/v1/controle-classificacoes/classificacao/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    
        //recebe o id da requisicao
    let idClass=request.params.id
    
        //recebe os dados da requisicao pelo body
    let dadosBody=request.body
    
    let resultClass=await controllerClassificacao.updateClassificacao(idClass, dadosBody, contentType)
    
    response.status(resultClass.status_code)
    response.json(resultClass)
})






/*************************************GENERO********************************************/
const controllerGenero=require('./controller/genero/controllerGenero.js')
app.post('/v1/controle-genero/genero', cors(), bodyParserJSON, async function (request, response) {
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultGen=await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGen.status_code)
    response.json(resultGen)
})

app.get('/v1/controle-genero/genero', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultGen=await controllerGenero.selectAllGenero()

    response.status(resultGen.status_code)
    response.json(resultGen)
})

app.get('/v1/controle-genero/genero/:id', cors(), async function (request, response){
    //recebe o id da requisicao
        let idGen=request.params.id
    
        let resultGen=await controllerGenero.selectByIdGenero(idGen)
    
        response.status(resultGen.status_code)
        response.json(resultGen)
    })
    
    
app.delete('/v1/controle-genero/genero/:id', cors(), async function (request, response) {
    let idGen=request.params.id
    
    let resultGen=await controllerGenero.deleteGenero(idGen)
    
    response.status(resultGen.status_code)
    response.json(resultGen)
})
    
app.put('/v1/controle-genero/genero/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    
        //recebe o id da requisicao
    let idGen=request.params.id
    
        //recebe os dados da requisicao pelo body
    let dadosBody=request.body
    
    let resultGen=await controllerGenero.updateGenero(idGen, dadosBody, contentType)
    
    response.status(resultGen.status_code)
    response.json(resultGen)
})




/*************************************IDIOMA********************************************/
const controllerIdioma=require('./controller/idioma/controllerIdioma.js')
app.post('/v1/controle-idioma/idioma', cors(), bodyParserJSON, async function (request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultIdioma=await controllerIdioma.inserirIdioma(dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-idioma/idioma', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultIdioma=await controllerIdioma.selectAllIdioma()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-idioma/idioma/:id', cors(), async function (request, response){
    //recebe o id da requisicao
        let idIdioma=request.params.id
    
        let resultIdioma=await controllerIdioma.selectByIdIdioma(idIdioma)
    
        response.status(resultIdioma.status_code)
        response.json(resultIdioma)
})
    
app.delete('/v1/controle-idioma/idioma/:id', cors(), async function (request, response) {
    let idIdioma=request.params.id
    
    let resultIdioma=await controllerIdioma.deleteIdioma(idIdioma)
    
    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})
    
app.put('/v1/controle-idioma/idioma/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    
        //recebe o id da requisicao
    let idIdioma=request.params.id
    
        //recebe os dados da requisicao pelo body
    let dadosBody=request.body
    
    let resultIdioma=await controllerIdioma.updateIdioma(idIdioma, dadosBody, contentType)
    
    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})




/*************************************NACIONALIDADE********************************************/
const controllerNacio=require('./controller/nacionalidade/controllerNacionalidade.js')
app.post('/v1/controle-nacionalidade/nacionalidade', cors(), bodyParserJSON, async function (request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultNacio=await controllerNacio.inserirNacioalidade(dadosBody, contentType)

    response.status(resultNacio.status_code)
    response.json(resultNacio)
})

app.get('/v1/controle-nacionalidade/nacionalidade', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultNacio=await controllerNacio.selectAllNacionalidade()

    response.status(resultNacio.status_code)
    response.json(resultNacio)
})

app.get('/v1/controle-nacionalidade/nacionalidade/:id', cors(), async function (request, response){
    //recebe o id da requisicao
        let idNacio=request.params.id
    
        let resultNacio=await controllerNacio.selectByIdNacionalidade(idNacio)
    
        response.status(resultNacio.status_code)
        response.json(resultNacio)
})
     
app.delete('/v1/controle-nacionalidade/nacionalidade/:id', cors(), async function (request, response) {
    let idNacio=request.params.id
    
    let resultNacio=await controllerNacio.deleteNacionalidade(idNacio)
    
    response.status(resultNacio.status_code)
    response.json(resultNacio)
})
    
app.put('/v1/controle-nacionalidade/nacionalidade/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    
        //recebe o id da requisicao
    let idNacio=request.params.id
    
        //recebe os dados da requisicao pelo body
    let dadosBody=request.body
    
    let resultNacio=await controllerNacio.updateNacionalidade(idNacio, dadosBody, contentType)
    
    response.status(resultNacio.status_code)
    response.json(resultNacio)
})




/*************************************SEXO********************************************/
const controllerSexo=require('./controller/sexo/conrollerSexo.js')
app.post('/v1/controle-sexo/sexo', cors(), bodyParserJSON, async function (request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultSexo=await controllerSexo.inserirSexo(dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-sexo/sexo', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultSexo=await controllerSexo.selectAllSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-sexo/sexo/:id', cors(), async function (request, response){
    //recebe o id da requisicao
        let idSexo=request.params.id
    
        let resultSexo=await controllerSexo.selectByIdSexo(idSexo)
    
        response.status(resultSexo.status_code)
        response.json(resultSexo)
})   
    
app.delete('/v1/controle-sexo/sexo/:id', cors(), async function (request, response) {
    let idSexo=request.params.id
    
    let resultSexo=await controllerSexo.deleteSexo(idSexo)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})
    
app.put('/v1/controle-sexo/sexo/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    
        //recebe o id da requisicao
    let idSexo=request.params.id
    
        //recebe os dados da requisicao pelo body
    let dadosBody=request.body
    
    let resultSexo=await controllerSexo.updateSexo(idSexo, dadosBody, contentType)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})




/*************************************USUARIO********************************************/
const controllerUsu=require('./controller/usuario/controllerUsuario.js')
app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON, async function (request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultUsu=await controllerUsu.inserirUsuario(dadosBody, contentType)

    response.status(resultUsu.status_code)
    response.json(resultUsu)
})

app.get('/v1/controle-usuario/usuario', cors(), async function (request, response) {
    //chama a funcção para retornar os filmes
    let resultUsu=await controllerUsu.selectAllUsuario()

    response.status(resultUsu.status_code)
    response.json(resultUsu)
})

app.get('/v1/controle-usuario/usuario/:id', cors(), async function (request, response){
    //recebe o id da requisicao
        let idUsu=request.params.id
    
        let resultUsu=await controllerUsu.selectByIdUsuario(idUsu)
    
        response.status(resultUsu.status_code)
        response.json(resultUsu)
})    
    
app.delete('/v1/controle-usuario/usuario/:id', cors(), async function (request, response) {
    let idUsu=request.params.id
    
    let resultUsu=await controllerUsu.deleteUsuario(idUsu)
    
    response.status(resultUsu.status_code)
    response.json(resultUsu)
})
    
app.put('/v1/controle-usuario/usuario/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content type da requisicao
    let contentType=request.headers['content-type']
    
        //recebe o id da requisicao
    let idUsu=request.params.id
    
        //recebe os dados da requisicao pelo body
    let dadosBody=request.body
    
    let resultUsu=await controllerUsu.updateUsuario(idUsu, dadosBody, contentType)
    
    response.status(resultUsu.status_code)
    response.json(resultUsu)
})






app.listen('3000', function(){
    console.log('API funcionando e aguardando requisições...')
})

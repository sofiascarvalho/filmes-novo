//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeDublagemDAO = require('../../model/DAO/filme_legenda.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeDublagem = async function(filmeDublagem, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmeDublagem.id              == ''           || filmeDublagem.id     == undefined    || filmeDublagem.id  == null || isNaN(filmeDublagem.id)  || filmeDublagem.id <=0 ||
                    filmeDublagem.id_dublagem             == ''           || filmeDublagem.id_dublagem    == undefined    || filmeDublagem.id_dublagem == null || isNaN(filmeDublagem.id_dublagem) || filmeDublagem.id_dublagem<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let result = await filmeDublagemDAO.inserirFilmeDublagem(filmeDublagem)

                    if(result)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const updateFilmeDublagem = async function(id, filmeDublagem, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                filmeDublagem.id              == ''           || filmeDublagem.id     == undefined    || filmeDublagem.id  == null || isNaN(filmeDublagem.id)  || filmeDublagem.id <=0 ||
                filmeDublagem.id_dublagem             == ''           || filmeDublagem.id_dublagem    == undefined    || filmeDublagem.id_dublagem == null || isNaN(filmeDublagem.id_dublagem) || filmeDublagem.id_dublagem<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await filmeDublagemDAO.updateFilmeDublagem(filmeDublagem)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const deleteFilmeDublagem = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let result = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(id))

            if(result != false || typeof(result) == 'object'){
                //Se existir, faremos o delete
                if(result.length > 0){
                    //delete
                    let result = await filmeDublagemDAO.deleteFilmeDublagem(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const selectAllFilmeDublagem = async function(){
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let result = await filmeDublagemDAO.selectAllFilmeDublagem()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = result.length
                dadosgenero.films = result

                return dadosgenero
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const selectByIdFilmeDublagem = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dados = {}

            let result = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(id))
            
            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dados.status = true
                     dados.status_code = 200
                     dados.legenda = result

                    return dados //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos pelo id do filme
const selectDulagemByIdFilme = async function(idFilme){

    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dados = {}

            let result = await filmeDublagemDAO.selectByIdFilmeDublagem(parseInt(idFilme))
            
            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dados.status = true
                     dados.status_code = 200
                     dados.legenda = result

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os filmes pelo id do genero
const selectFilmeByIdDublagem = async function(id_dublagem){

    try {
        if(id_dublagem == '' || id_dublagem == undefined || id_dublagem == null || isNaN(id_dublagem) || id_dublagem <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}

            let resultFilme = await filmeDublagemDAO.selectDulagemByIdFilme(parseInt(id_dublagem))
            
            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.filme = resultFilme

                    return dadosFilme //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports={
    inserirFilmeDublagem,
    updateFilmeDublagem,
    deleteFilmeDublagem,
    selectAllFilmeDublagem,
    selectByIdFilmeDublagem,
    selectFilmeByIdDublagem,
    selectDulagemByIdFilme
}
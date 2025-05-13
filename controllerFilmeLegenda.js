//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeLegendaDAO = require('../../model/DAO/filme_legenda.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeLegenda = async function(filmeLegenda, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmeLegenda.id              == ''           || filmeLegenda.id     == undefined    || filmeLegenda.id  == null || isNaN(filmeLegenda.id)  || filmeLegenda.id <=0 ||
                    filmeLegenda.id_legenda             == ''           || filmeLegenda.id_legenda    == undefined    || filmeLegenda.id_legenda == null || isNaN(filmeLegenda.id_legenda) || filmeLegenda.id_legenda<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let result = await filmeLegendaDAO.insertFilmeLegenda(filmeLegenda)

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
const atualizarFilmeLegenda = async function(id, filmeLegenda, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    filmeLegenda.id              == ''           || filmeLegenda.id     == undefined    || filmeLegenda.id  == null || isNaN(filmeLegenda.id)  || filmeLegenda.id <=0 ||
                    filmeLegenda.id_legenda             == ''           || filmeLegenda.id_legenda    == undefined    || filmeLegenda.id_legenda == null || isNaN(filmeLegenda.id_legenda) || filmeLegenda.id_legenda<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await filmeLegendaDAO.selectByIdFilmeLegenda(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await filmeLegendaDAO.updateFilmeLegenda(filmeLegenda)

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
const excluirFilmeLegenda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let result = await filmeLegendaDAO.selectByIdFilmeLegenda(parseInt(id))

            if(result != false || typeof(result) == 'object'){
                //Se existir, faremos o delete
                if(result.length > 0){
                    //delete
                    let result = await filmeLegendaDAO.deleteFilmeLegenda(parseInt(id))

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
const listarFilmeLegenda = async function(){
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let result = await filmeLegendaDAO.selectAllFilmeLegenda()

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
const buscarFilmeLegenda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dados = {}

            let result = await filmeLegendaDAO.selectByIdFilmeLegenda(parseInt(id))
            
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
const buscarLegendaPorFilme = async function(idFilme){

    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dados = {}

            let result = await filmeLegendaDAO.selectByIdFilmeLegenda(parseInt(idFilme))
            
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
const buscarFilmePorLegenda = async function(idLegenda){

    try {
        if(idLegenda == '' || idLegenda == undefined || idLegenda == null || isNaN(idLegenda) || idLegenda <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}

            let resultFilme = await filmeLegendaDAO.selectLegendaByIdFilme(parseInt(idLegenda))
            
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



module.exports = {
inserirFilmeLegenda,
atualizarFilmeLegenda,
excluirFilmeLegenda,
listarFilmeLegenda,
buscarFilmeLegenda,
buscarLegendaPorFilme,
buscarFilmePorLegenda
} 
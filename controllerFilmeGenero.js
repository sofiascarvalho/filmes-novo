//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeGenero = async function(filmeGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmeGenero.id              == ''           || filmeGenero.id     == undefined    || filmeGenero.id  == null || isNaN(filmeGenero.id)  || filmeGenero.id <=0 ||
                    filmeGenero.id_genero             == ''           || filmeGenero.id_genero    == undefined    || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultgenero = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                    if(resultgenero)
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
const atualizarFilmeGenero = async function(id, filmeGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                  == ''           || id                       == undefined    || id                       == null || isNaN(id)                    || id  <= 0             ||
                    filmeGenero.id                      == ''           || filmeGenero.id           == undefined    || filmeGenero.id           == null || isNaN(filmeGenero.id)        || filmeGenero.id <=0   ||
                    filmeGenero.id_genero               == ''           || filmeGenero.id_genero    == undefined    || filmeGenero.id_genero    == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await filmeGeneroDAO.updateGenero(filmeGenero)

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
const excluirFilmeGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

            if(result != false || typeof(result) == 'object'){
                //Se existir, faremos o delete
                if(result.length > 0){
                    //delete
                    let result = await filmeGeneroDAO.deleteFilmeGenero(parseInt(id))

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
const listarFilmeGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultgenero = await filmeGeneroDAO.selectAllFilmeGenero()

        if(resultgenero != false || typeof(resultgenero) == 'object'){
            if(resultgenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = resultgenero.length
                dadosgenero.films = resultgenero

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
const buscarFilmeGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

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

//Função para retornar os generos pelo id do filme
const buscarGeneroPorFilme = async function(idFilme){

    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await filmeGeneroDAO.selectGeneroByIdFilme(parseInt(idFilme))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

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
const buscarFilmePorGenero = async function(idGenero){

    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}

            let resultFilme = await filmeGeneroDAO.selectFilmeByIdGenero(parseInt(idGenero))
            
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
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGeneroPorFilme,
    buscarFilmePorGenero
} 
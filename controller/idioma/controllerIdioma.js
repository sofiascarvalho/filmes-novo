/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 21/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const idiomaDAO=require('../../model/DAO/idioma.js')

//funcao para tratar a insercao de um idioma no DAO
const inserirIdioma=async function (idioma, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(idioma.idioma==''||idioma.idioma==undefined||idioma.idioma==null||idioma.idioma.length>45){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultIdioma=await idiomaDAO.inserirIdioma(idioma)
                if(resultIdioma)
                    return message.SUCCESS_CREATED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//funcao para tratar a atualizacao de um idioma no DAO
const updateIdioma=async function (id_idioma, idioma, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(id_idioma==''||id_idioma==undefined||id_idioma==null||isNaN(id_idioma)||id_idioma<=0||
            idioma.idioma==''||idioma.idioma==undefined||idioma.idioma==null||idioma.idioma.length>45
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultIdioma=await idiomaDAO.selectByIdIdioma(parseInt(id_idioma))
                if (resultIdioma!=false||typeof(resultIdioma)=='object'){
                    if(resultIdioma.length>0){
                        idioma.id_idioma=parseInt(id_idioma)
                        let result=await idiomaDAO.updateIdioma(idioma)
                        if(result)
                            return message.SUCCESS_UPDATED_ITEM
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports={
    inserirIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}
***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 21/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const idiomaDAO=require('../../model/DAO/idioma.js')

//funcao para tratar a insercao de um idioma no DAO
const inserirIdioma=async function (idioma, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(idioma.idioma==''||idioma.idioma==undefined||idioma.idioma==null||idioma.idioma.length>45){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultIdioma=await idiomaDAO.inserirIdioma(idioma)
                if(resultIdioma)
                    return message.SUCCESS_CREATED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//funcao para tratar a atualizacao de um idioma no DAO
const updateIdioma=async function (id_idioma, idioma, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(id_idioma==''||id_idioma==undefined||id_idioma==null||isNaN(id_idioma)||id_idioma<=0||
            idioma.idioma==''||idioma.idioma==undefined||idioma.idioma==null||idioma.idioma.length>45
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultIdioma=await idiomaDAO.selectByIdIdioma(parseInt(id_idioma))
                if (resultIdioma!=false||typeof(resultIdioma)=='object'){
                    if(resultIdioma.length>0){
                        idioma.id_idioma=parseInt(id_idioma)
                        let result=await idiomaDAO.updateIdioma(idioma)
                        if(result)
                            return message.SUCCESS_UPDATED_ITEM
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//funcao para tratar a exclusao de um filme no DAO
const deleteIdioma=async function (id_idioma) {
    try {
        if(id_idioma==''||id_idioma==undefined||id_idioma==null||isNaN(id_idioma)||id_idioma<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultIdioma=await idiomaDAO.selectByIdIdioma(parseInt(id_idioma))
            if(resultIdioma!=false||typeof(resultIdioma)=='object'){
                if(resultIdioma.length>0){
                    let result=await idiomaDAO.deleteIdioma(parseInt(id_idioma))
                    if(result){
                        return message.SUCCESS_DELETED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//funcao para tratar po retorno de uma lista de filmes do DAO
const selectAllIdioma=async function(){
    try {
        //objeto do tipo JSON
        let dadosIdioma={}
        //chama a funcao para retronar os idiomas cadastrados 
        let resultIdioma=await idiomaDAO.selectAllIdioma()
        console.log(resultIdioma);
        

        if(resultIdioma!=false||typeof(resultIdioma)=='object'){
            if(resultIdioma.length>0){
                //ciando um JSON de retorno de dados para a API
                dadosIdioma.status=true
                dadosIdioma.status_code=200
                dadosIdioma.items=resultIdioma.length
                dadosIdioma.films=resultIdioma

                return dadosIdioma
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

//funcao para tratar p retorno de um idioma filtrado pelo id do DAO
const selectByIdIdioma=async function(id_idioma){
    try {
        if(id_idioma == ''||id_idioma==undefined||id_idioma==null||isNaN(id_idioma)||id_idioma<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{

            dadosIdioma={}

            let resultIdioma=await idiomaDAO.selectByIdIdioma(parseInt(id_idioma))

            if(resultIdioma!=false||typeof(resultIdioma)=='object'){
                if(resultIdioma.length>0){

                    dadosIdioma.status=true
                    dadosIdioma.status_code=200
                    dadosIdioma.idioms=resultIdioma

                    return dadosIdioma //200
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
    inserirIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}
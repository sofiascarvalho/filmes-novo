/***************************************************************************************
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


module.exports={
    inserirIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}
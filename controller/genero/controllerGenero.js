/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de genero
 * data: 15/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const genDAO=require('../../model/DAO/genero.js')

const inserirGenero=async function (genero, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(genero.genero==''||genero.genero==undefined||genero.genero==null||genero.genero.length>45){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result=await genDAO.inserirGenero(genero)
                if(result)
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

const updateGenero=async function (id_genero, genero, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if( id_genero==''       ||id_genero==undefined      ||id_genero==null       ||isNaN(id_genero)          ||id_genero<=0  ||
                genero.genero==''   ||genero.genero==undefined  ||genero.genero==null   ||genero.genero.length>45
        ){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let result=await genDAO.selectByIdGenero(parseInt(id_genero))
            if(result!=false||typeof(result)=='object'){
                if(result.length>0){
                    genero.id_genero=parseInt(id_genero)
                    let resultGen=await genDAO.updateGenero(genero)
                    if(resultGen)
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

const deleteGenero=async function (id_genero) {
    try {
        if(id_genero==''       ||id_genero==undefined      ||id_genero==null       ||isNaN(id_genero)          ||id_genero<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let result=await genDAO.selectByIdGenero(parseInt(id_genero))
            if(result!=false||typeof(result)=='object'){
                if(result.length>0){
                    let resultGen=await genDAO.deleteGenero(parseInt(id_genero))
                    if(resultGen){
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

const selectAllGenero=async function () {
    try {
        let dadosGenero={}
        let resultGen=await genDAO.selectAllGenero()
        console.log(resultGen);
        

        if(resultGen!=false||typeof(resultGen)=='object'){
            if(resultGen.length>0){
                dadosGenero.status=true
                dadosGenero.status_code=200
                dadosGenero.items=resultGen.length
                dadosGenero.genrs=resultGen

                return dadosGenero
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const selectByIdGenero=async function (id_genero) {
    try {
        if(id_genero==''       ||id_genero==undefined      ||id_genero==null       ||isNaN(id_genero)          ||id_genero<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            dadosGenero={}
            let resultGen=await genDAO.selectByIdGenero(parseInt(id_genero))
            if(resultGen!=false||typeof(resultGen)=='object'){
                if(resultGen.length>0){
                    dadosGenero.status=true
                    dadosGenero.status_code=200
                    dadosGenero.genrs=resultGen

                    return dadosGenero
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

module.exports={
    inserirGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}
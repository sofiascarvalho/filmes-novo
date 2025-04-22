/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 15/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const classDAO=require('../../model/DAO/classificacao.js')

const inserirClassificacao=async function (classificacao, contentType) {
    try {
        
        if(String(contentType).toLowerCase()=='application/json'){
            if(
                classificacao.classificacao==''         ||
                classificacao.classificacao==undefined  ||
                classificacao==null                     ||
                classificacao.classificacao.length>100
            )
            {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result=await classDAO.inserirClassificacao(classificacao)

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

const updateClassificacao=async function (id_classificacao, classificacao, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(id_classificacao==''                 ||id_classificacao==undefined               ||id_classificacao==null        ||  isNaN(id_classificacao)         ||  id_classificacao<=0     ||
                classificacao.classificacao==''     ||classificacao.classificacao==undefined    ||classificacao==null           ||  classificacao.classificacao.length>100
            )
            {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //validacao para verificar se o id existe no banco de dados
                let result=await classDAO.selectByIdClassificacao(parseInt(id_classificacao))
                if(result!=false||typeof(result)=='object'){
                    if(result.length>0){
                        //update
                        //adiciona o id do filme no json com os dados
                        classificacao.id_classificacao=parseInt(id_classificacao)
                        let resultClass=await classDAO.updateClassificacao(classificacao)
                        if(resultClass)
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

const deleteClassificacao=async function (id_classificacao) {
    try {
        if(id_classificacao=='' ||id_classificacao==undefined   ||id_classificacao==null    ||isNaN(id_classificacao)   ||id_classificacao<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //validacao da existencia do id no banco de dados
            let result=await classDAO.selectByIdClassificacao(parseInt(id_classificacao))
            if(result!=false||typeof(result)=='object'){
                if(result.length>0){
                    let resultClass=await classDAO.deleteClassificacao(parseInt(id_classificacao))
                    if(resultClass){
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const selectAllClassificacao=async function () {
    try {
        let dadosClass={}
        let resultClass=await classDAO.selectAllClassificacao()
        console.log(resultClass);
        
        if(resultClass!=false||typeof(resultClass)=='object'){

            if(resultClass.length>0){
                dadosClass.status=true
                dadosClass.status_code=200
                dadosClass.items=resultClass.length
                dadosClass.class=resultClass

                return dadosClass
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

const selectByIdClassificacao=async function (id_classificacao) {
    try {
        if(id_classificacao == ''||id_classificacao==undefined||id_classificacao==null||isNaN(id_classificacao)||id_classificacao<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
    
            dadosClass={}
    
            let resultClass=await classDAO.selectByIdClassificacao(parseInt(id_classificacao))
    
            if(resultClass!=false||typeof(resultClass)=='object'){
                if(resultClass.length>0){
    
                    dadosClass.status=true
                    dadosClass.status_code=200
                    dadosClass.class=resultClass
    
                    return dadosClass //200
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
    inserirClassificacao,
    updateClassificacao, 
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao
}
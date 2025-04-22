/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 22/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const nacioDAO=require('../../model/DAO/nacionalidade.js')

//funcao para tratar a insercao de um idioma no DAO
const inserirNacioalidade=async function (nacionalidade, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(nacionalidade.nacionalidade==''||nacionalidade.nacionalidade==undefined||nacionalidade.nacionalidade==null||nacionalidade.nacionalidade.length>30){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultNacio=await nacioDAO.inserirNacioalidade(nacionalidade)
                if(resultNacio)
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
const updateNacionalidade=async function (id_nacionalidade, nacionalidade, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(id_nacionalidade==''||id_nacionalidade==undefined||id_nacionalidade==null||isNaN(id_nacionalidade)||id_nacionalidade<=0||
            nacionalidade.nacionalidade==''||nacionalidade.nacionalidade==undefined||nacionalidade.nacionalidade==null||nacionalidade.nacionalidade.length>30
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultNacio=await nacioDAO.selectByIdNacionalidade(parseInt(id_nacionalidade))
                console.log(resultNacio);
                
                if (resultNacio!=false||typeof(resultNacio)=='object'){
                    if(resultNacio.length>0){
                        nacionalidade.id_nacionalidade=parseInt(id_nacionalidade)
                        let result=await nacioDAO.updateNacionalidade(nacionalidade)
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
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//funcao para tratar a exclusao de um filme no DAO
const deleteNacionalidade=async function (id_nacionalidade) {
    try {
        if(id_nacionalidade==''||id_nacionalidade==undefined||id_nacionalidade==null||isNaN(id_nacionalidade)||id_nacionalidade<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultNacio=await nacioDAO.selectByIdNacionalidade(parseInt(id_nacionalidade))
            if(resultNacio!=false||typeof(resultIdioma)=='object'){
                if(resultNacio.length>0){
                    let result=await nacioDAO.deleteNacionalidade(parseInt(id_nacionalidade))
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
const selectAllNacionalidade=async function(){
    try {
        //objeto do tipo JSON
        let dadosNacio={}
        //chama a funcao para retronar os idiomas cadastrados 
        let resultNacio=await nacioDAO.selectAllNacionalidade()

        if(resultNacio!=false||typeof(resultNacio)=='object'){
            if(resultNacio.length>0){
                //ciando um JSON de retorno de dados para a API
                dadosNacio.status=true
                dadosNacio.status_code=200
                dadosNacio.items=resultNacio.length
                dadosNacio.nacio=resultNacio

                return dadosNacio
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
const selectByIdNacionalidade=async function(id_nacionalidade){
    try {
        if(id_nacionalidade == ''||id_nacionalidade==undefined||id_nacionalidade==null||isNaN(id_nacionalidade)||id_nacionalidade<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{

            dadosNacio={}

            let resultNacio=await nacioDAO.selectByIdNacionalidade(parseInt(id_nacionalidade))

            if(resultNacio!=false||typeof(resultNacio)=='object'){
                if(resultNacio.length>0){

                    dadosNacio.status=true
                    dadosNacio.status_code=200
                    dadosNacio.nacio=resultNacio

                    return dadosNacio //200
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
    inserirNacioalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}
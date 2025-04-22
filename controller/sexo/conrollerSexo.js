/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 22/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const sexoDAO=require('../../model/DAO/sexo.js')

//funcao para tratar a insercao de um idioma no DAO
const inserirSexo=async function (sexo, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(sexo.sexo==''||sexo.sexo==undefined||sexo.sexo==null||sexo.sexo.length>10){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultSexo=await sexoDAO.inserirSexo(sexo)
                if(resultSexo)
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
const updateSexo=async function (id_sexo, sexo, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(id_sexo==''||id_sexo==undefined||id_sexo==null||isNaN(id_sexo)||id_sexo<=0||
            sexo.sexo==''||sexo.sexo==undefined||sexo.sexo==null||sexo.sexo.length>10
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultSexo=await sexoDAO.selectByIdSexo(parseInt(id_sexo))
                if (resultSexo!=false||typeof(resultSexo)=='object'){
                    if(resultSexo.length>0){
                        sexo.id_sexo=parseInt(id_sexo)
                        let result=await sexoDAO.updateSexo(sexo)
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
const deleteSexo=async function (id_sexo) {
    try {
        if(id_sexo==''||id_sexo==undefined||id_sexo==null||isNaN(id_sexo)||id_sexo<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultSexo=await sexoDAO.selectByIdSexo(parseInt(id_sexo))
            if(resultSexo!=false||typeof(resultSexo)=='object'){
                if(resultSexo.length>0){
                    let result=await sexoDAO.deleteSexo(parseInt(id_sexo))
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
const selectAllSexo=async function(){
    try {
        //objeto do tipo JSON
        let dadosSexo={}
        //chama a funcao para retronar os idiomas cadastrados 
        let resultSexo=await sexoDAO.selectAllSexo()

        if(resultSexo!=false||typeof(resultSexo)=='object'){
            if(resultSexo.length>0){
                //ciando um JSON de retorno de dados para a API
                dadosSexo.status=true
                dadosSexo.status_code=200
                dadosSexo.items=resultSexo.length
                dadosSexo.sexo=resultSexo

                return dadosSexo
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
const selectByIdSexo=async function(id_sexo){
    try {
        if(id_sexo==''||id_sexo==undefined||id_sexo==null||isNaN(id_sexo)||id_sexo<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{

            dadosSexo={}

            let resultSexo=await sexoDAO.selectByIdSexo(parseInt(id_sexo))

            if(resultSexo!=false||typeof(resultSexo)=='object'){
                if(resultSexo.length>0){

                    dadosSexo.status=true
                    dadosSexo.status_code=200
                    dadosSexo.sexo=resultSexo

                    return dadosSexo //200
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
    inserirSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}
/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 22/04/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const usuDAO=require('../../model/DAO/usuario.js')

//funcao para tratar a insercao de um usuario no DAO
const inserirUsuario=async function (usuario, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(usuario.nome_usuario==''||usuario.nome_usuario==undefined||usuario.nome_usuario==null||usuario.nome_usuario.length>200||
                usuario.email_usuario==''||usuario.email_usuario==undefined||usuario.email_usuario==null||usuario.email_usuario.length>200
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultUsu=await usuDAO.inserirUsuario(usuario)
                if(resultUsu)
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
const updateUsuario=async function (id_usuario, usuario, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            if(id_usuario==''||id_usuario==undefined||id_usuario==null||isNaN(id_usuario)||id_usuario<=0||
            usuario.nome_usuario==''||usuario.nome_usuario==undefined||usuario.nome_usuario==null||usuario.nome_usuario.length>200||
            usuario.email_usuario==''||usuario.email_usuario==undefined||usuario.email_usuario==null||usuario.email_usuario.length>200
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultUsu=await usuDAO.selectByIdUsuario(parseInt(id_usuario))
                if (resultUsu!=false||typeof(resultUsu)=='object'){
                    if(resultUsu.length>0){
                        usuario.id_usuario=parseInt(id_usuario)
                        let result=await usuDAO.updateUsuario(usuario)
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
const deleteUsuario=async function (id_usuario) {
    try {
        if(id_usuario==''||id_usuario==undefined||id_usuario==null||isNaN(id_usuario)||id_usuario<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultUsu=await usuDAO.selectByIdUsuario(parseInt(id_usuario))
            if(resultUsu!=false||typeof(resultUsu)=='object'){
                if(resultUsu.length>0){
                    let result=await usuDAO.deleteUsuario(parseInt(id_usuario))
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
const selectAllUsuario=async function(){
    try {
        //objeto do tipo JSON
        let dadosUsu={}
        //chama a funcao para retronar os idiomas cadastrados 
        let resultUsu=await usuDAO.selectAllUsuario()

        if(resultUsu!=false||typeof(resultUsu)=='object'){
            if(resultUsu.length>0){
                //ciando um JSON de retorno de dados para a API
                dadosUsu.status=true
                dadosUsu.status_code=200
                dadosUsu.items=resultUsu.length
                dadosUsu.usu=resultUsu

                return dadosUsu
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
const selectByIdUsuario=async function(id_usuario){
    try {
        if(id_usuario==''||id_usuario==undefined||id_usuario==null||isNaN(id_usuario)||id_usuario<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{

            dadosUsu={}

            let resultUsu=await usuDAO.selectByIdUsuario(parseInt(id_usuario))

            if(resultUsu!=false||typeof(resultUsu)=='object'){
                if(resultUsu.length>0){

                    dadosUsu.status=true
                    dadosUsu.status_code=200
                    dadosUsu.usu=resultUsu

                    return dadosUsu //200
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
    inserirUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}

/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 11/02/2025
 * autor: sofia
 * versao: 1.0 
 ***************************************************************************************/

//import do arquivo de mensagem e status code do projeto
const message=require('../../modulo/config.js')

//import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeDAO=require('../../model/DAO/filme.js')

//import das controller para os relacionamentos
const controllerClassifcacao=require('..classificacao/controllerClassificacao.js')
const controllerFilmegenero = require('../filme/controllerFilmeGenero.js')
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//funcao para tratar a insercao de um filme no DAO
const inserirFilme=async function(filme, contentType){
    
    try {

        if(String(contentType).toLowerCase()=='application/json')
        {
            if(filme.nome == ''                 ||filme.nome ==undefined            ||filme.nome==null              ||filme.nome.length>80      ||
                filme.duracao==''               ||filme.duracao==undefined          ||filme.duracao==null           ||filme.duracao.length>5    ||
                filme.sinopse==''               ||filme.sinopse==undefined          ||filme.sinopse==null           ||
                filme.data_lancamento==''       ||filme.data_lancamento==undefined  ||filme.data_lancamento==null   ||filme.data_lancamento>10  ||
                filme.foto_capa==undefined      ||filme.foto_capa>200               ||
                filme.link_trailer==undefined   ||filme.link_trailer>200 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //chama a funcao para inserir no banco de dados e aguarda o retorno da funcao
             let resultFilme=await filmeDAO.insertFilme(filme)
             if (resultFilme) {
                // Se houver gêneros para associar
                if (filme.genero && Array.isArray(filme.genero)) {
                    // Obtém o ID do filme inserido
                    let filmeInserido = await filmeDAO.selectLastInsertId();
                    let idFilme = filmeInserido[0].id;
                    
                    // Para cada gênero no array, cria a relação
                    for (let genero of filme.genero) {
                        if (genero.id && !isNaN(genero.id)) {
                            let filmeGenero = {
                                id_filme: idFilme,
                                id_genero: genero.id
                            };
                            await filmeGeneroDAO.insertFilmeGenero(filmeGenero);
                        }
                    }
                }
                    return message.SUCCESS_CREATED_ITEM //201
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

//funcao para tratar a atualizacao de um filme no DAO
const atualizarFilme=async function(id, filme, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json')
            {
                if (id==''                          ||id==undefined                     ||id==null                      ||isNaN(id)         ||id<=0 ||
                    filme.nome == ''                ||filme.nome ==undefined            ||filme.nome==null              ||filme.nome.length>80      ||
                    filme.duracao==''               ||filme.duracao==undefined          ||filme.duracao==null           ||filme.duracao.length>5    ||
                    filme.sinopse==''               ||filme.sinopse==undefined          ||filme.sinopse==null           ||
                    filme.data_lancamento==''       ||filme.data_lancamento==undefined  ||filme.data_lancamento==null   ||filme.data_lancamento>10  ||
                    filme.foto_capa==undefined      ||filme.foto_capa>200               ||
                    filme.link_trailer==undefined   ||filme.link_trailer>200 
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //validacao para verificar se o id existe no banco de dados
                    let resultFilme=await filmeDAO.selectByIdFilme(parseInt(id))

                    if(resultFilme!=false||typeof(resultFilme)=='object'){
                        if(resultFilme.length>0){
                            //update
                            //adiciona o id do filme no json com os dados
                            filme.id=parseInt(id)
                            let result=await filmeDAO.updateFilme(filme)
                            if(result)
                                return message.SUCCESS_UPDATED_ITEM //200
                            else
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
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

//funcao para tratar a exclusao de um filme no DAO
const excluirFilme=async function(id){
    try {
        if(id==''||id==undefined||id==null||isNaN(id)||id<=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            //funcao que verifica se o id existe no banco de dados
            let resultFilme=await filmeDAO.selectByIdFilme(parseInt(id))

            if(resultFilme!=false||typeof(resultFilme)=='object'){
                //se existir, faremos o delete
                if(resultFilme.length>0){
                    //delete
                    let result=await filmeDAO.deleteFilme(parseInt(id))

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

//funcao para tratar o retorno de uma lista de filmes do DAO
const listarFilme=async function(){
    try {

        //cria objeto aray para montar a nova estrutura de filmes o forEach
        let arrayFilmes=[]

        //objeto do tipo JSON
        let dadosFilme={}
        //chama a funcao para retronar os filmes cadastrados 
        let resultFilme=await filmeDAO.selectAllFilme()

        if(resultFilme!=false||typeof(resultFilme)=='object'){
            if(resultFilme.length>0){
                //ciando um JSON de retorno de dados para a API
                dadosFilme.status=true
                dadosFilme.status_code=200
                dadosFilme.items=resultFilme.length

                for (const itemFilme of resultFilme){
                    let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                        
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemFilme.classificacao = dadosClassificacao.classificacao

                    //Remover um atributo do JSON
                    delete itemFilme.id_classificacao

                    let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
                        console.log(dadosGenero)
                        //Adiciona um atributo genero no JSON de filmes e coloca os dados do genero
                        itemFilme.genero = dadosGenero.genero

                    /* */
                    
                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
                }

                dadosFilme.films=resultFilme

                return dadosFilme
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

//funcao para tratar o retorno de um filme filtrado pelo id do DAO
const buscarFilme=async function(id){
    try {

        let arrayFilmes=[]
        
        if(id == ''||id==undefined||id==null||isNaN(id)||id<=0){
            return message.ERROR_REQUIRED_FIELDS
        }else{

            dadosFilme={}

            let resultFilme=await filmeDAO.selectByIdFilme(parseInt(id))

            if(resultFilme!=false||typeof(resultFilme)=='object'){
                if(resultFilme.length>0){

                    dadosFilme.status=true
                    dadosFilme.status_code=200

                    for(const itemFilme of resultFilme){
                        let dadosClassificacao=await controllerClassifcacao.buscarClassificacao(itemFilme.id_classificacao)
                        itemFilme.classificacao = dadosClassificacao.classificacao
                     
                        //Remover um atributo do JSON
                        delete itemFilme.id_classificacao
                     
                        //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                        arrayFilmes.push(itemFilme)
                    }
                    dadosFilme.films=arrayFilmes

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
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}
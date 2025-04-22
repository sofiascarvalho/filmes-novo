/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de filmes
* data: 10/04/2025
* autor: sofia
* versao: 1.0
***********************************************************************************/

//import da biblioteca do prisma/client para executar os scripts SQL
const {PrismaClient}=require('@prisma/client')

//instancia (criar objeto a ser utilizado) a biblioteca do prisma/client
const prisma=new PrismaClient()





/****************************** TABELA CLASSIFICACAO ******************************/
//funcao para inserir nacionalidade
const inserirClassificacao=async function (classificacao) {
    try {
        let sql=`insert into tbl_classificacao  (classificacao
                                            )
                                            values
                                            (
                                            '${classificacao.classificacao}'
                                            )`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false        
    }
}

//funcao para atualizar classificacao
const updateClassificacao=async function (classificacao) {
    try {
        let sql=`update tbl_classificacao set classificacao = '${classificacao.classificacao}'
                                                where id = ${classificacao.id_classificacao}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
    
}

//funcao para deletar classificacao
const deleteClassificacao=async function (id_classificacao) {
    try {
        let sql=`delete from tbl_classificacao where id = ${id_classificacao}`
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao para retornar todas as classificacoes
const selectAllClassificacao=async function () {
    try {
        let sql=`select * from tbl_classificacao order by id_classificacao desc`
        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        console.log(error);
        
        return false
    }
}

//funcao para buscar uma classficacao pelo id
const selectByIdClassificacao=async function (id_classificacao) {
    try {
        let sql=`select * from tbl_classificacao where id_classificacao = ${id_classificacao}`
        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    inserirClassificacao,
    updateClassificacao, 
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao
}
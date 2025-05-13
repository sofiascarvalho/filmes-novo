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


/****************************** TABELA NACIONALIDADE ******************************/
//funcao para inserir nacionalidade
const inserirNacioalidade=async function (nacionalidade) {
    try {
        let sql=`insert into tbl_nacionalidade  (nacionalidade
                                            )
                                            values
                                            (
                                            '${nacionalidade.nacionalidade}'
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

//funcao para atualizar nacionalidade
const updateNacionalidade=async function (nacionalidade) {
    try {
        let sql=`update tbl_nacionalidade set nacionalidade = '${nacionalidade.nacionalidade}'`
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        console.log(error);
        
        return false
    }
}

//funcao para deletar nacionalidade
const deleteNacionalidade=async function (id_nacionalidade) {
    try {
        let sql=`delete from tbl_nacionalidade where id_nacionalidade = ${id_nacionalidade}`
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao para retornar todas as nacionalidades
const selectAllNacionalidade=async function () {
    try {
        let sql=`select * from tbl_nacionalidade order by id_nacionalidade desc`
        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao para buscar nacionalidade pelo id
const selectByIdNacionalidade=async function (id_nacionalidade) {
    try {
        let sql=`select * from tbl_nacionalidade where id_nacionalidade = ${id_nacionalidade}`
        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports={
    inserirNacioalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}
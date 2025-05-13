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



/****************************** TABELA GENERO ******************************/
//funcao para inserir um genero
const inserirGenero=async function (genero) {
    try {
        let sql=`insert into tbl_genero (
                                    genero
                                    )
                                    values
                                    (
                                    '${genero.genero}'
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
//funcao para atualizar genero
const updateGenero=async function (genero) {
    try {
        let sql=`update tbl_genero set genero = '${genero.genero}'
                                    where id_genero = ${genero.id_genero}`

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
//funcao para deletar genero existente
const deleteGenero=async function (id_genero) {
   try {
    let sql=`delete from tbl_genero where id_genero = ${id_genero}`

    let result=await prisma.$executeRawUnsafe(sql)
    if(result)
        return result
    else
        return false

   } catch (error) {
    return false
   } 
}
//funcao para retornar todos os generos existentes
const selectAllGenero=async function () {
    try {
        let sql=`select * from tbl_genero order by id_genero desc`

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
//funcao para buscar genero pelo id
const selectByIdGenero=async function (id_genero) {
    try {
        let sql=`select * from tbl_genero where id_genero = ${id_genero}`

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
    inserirGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}
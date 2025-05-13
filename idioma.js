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

/****************************** TABELA iDIOMA ******************************/
// funcao para inserir um idioma
const inserirIdioma=async function (idioma) {
    try {
        let sql= `insert into tbl_idioma    (idioma
                                        )
                                        values
                                        (
                                        '${idioma.idioma}')`

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
//funcao para atualizar um idioma
const updateIdioma=async function (idioma) {
    try {
        let sql=`update tbl_idioma set idioma = '${idioma.idioma}'
                                        where id_idioma = ${idioma.id_idioma}`

        let resultIdioma=await prisma.$executeRawUnsafe(sql)
        if(resultIdioma)
            return resultIdioma
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}
//funcao para deletar idioma
const deleteIdioma=async function (id_idioma) {
    try {
        let sql=`delete from tbl_idioma where id_idioma = ${id_idioma}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}
//funcao para retornar todos os idiomas existentes
const selectAllIdioma=async function () {
    try {
        let sql=`select * from tbl_idioma order by id_idioma desc`

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
//funcao para buscar um idioma pelo id
const selectByIdIdioma=async function (id_idioma) {
   try {
    let sql=`select * from tbl_idioma where id_idioma = ${id_idioma}`

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
    inserirIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}
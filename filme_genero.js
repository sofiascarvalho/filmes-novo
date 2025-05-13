/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de genero de filmes
* data: 13/05/2025
* autor: sofia
* versao: 1.0
***********************************************************************************/

//import da biblioteca do prisma/client para executar os scripts SQL
const {PrismaClient}=require('@prisma/client')

//instancia (criar objeto a ser utilizado) a biblioteca do prisma/client
const prisma=new PrismaClient()


//funcao para inserir um novo FilmeGenero
const inserirFilmeGenero=async function (FilmeGenero) {
    try {
        let sql=`insert into tbl_filme_genero(
                                                id,
                                                id_genero
                                                )
                                                values
                                                (
                                                ${FilmeGenero.id},
                                                ${FilmeGenero.id_genero}
                                            )`

        let result=await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }
}

//funcao para atualizar um FilmeGenero
const updateFilmeGenero=async function (FilmeGenero) {
    try {
        let sql=`update tbl_filme_genero set id = '${FilmeGenero.id}',
                                                    '${FilmeGenero.id_genero}'
                                                    where id_filme_genero = ${FilmeGenero.id_filme_genero}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao para deletar um FilmeGenero
const deleteFilmeGenero=async function (id_filme_genero) {
    try {
        let sql=`delete from tbl_filme_genero where id_filme_genero = ${id_filme_genero}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao para retornar todos os FilmeGenero existentes
const selectAllFilmeGenero=async function () {
    try {
        let sql='select * from tbl_filme_genero order by id_filme_genero desc'

        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao para buscar FilmeGenero pelo ID
const selectByIdFilmeGenero=async function (id_filme_genero) {
    try {
        let sql=`select * from tb_filme_genero where id_filme_genero = ${id_filme_genero}`

        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//fucao para retornar os filmes pelo genero
const selectFilmeByIdGenero=async function (id_genero) {
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                              inner join tbl_filme_genero
                                                on tbl_filme.id_filme_genero = tbl_filme_genero.id
                                              inner join tbl_genero
                                                on tbl_genero.id_filme_genero = tbl_filme_genero.id_genero
                    where tbl_filme_genero.id_genero = ${id_genero}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
          return result
      else 
          return false
    } catch (error) {
        return false
    }
}

//funcao para retornar os generos pelo filme
const selectGeneroByIdFilme=async function (id) {
    try {
        let sql=`select tbl_genero.* from tbl_filme
                                            inner join tbl_filme_genero
                                                on tbl_filme.id_filme_genero = tbl_filme_genero.id
                                            inner join tbl_genero.id_filme_genero = tbl_filme_genero.id_genero
                    where tbl_filme_genero.id = ${id}`

        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
    } catch (error) {
        
    }
}


module.exports={
    inserirFilmeGenero,
    updateFilmeGenero,
    deleteFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmeByIdGenero,
    selectGeneroByIdFilme
}
/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de legenda de filmes
* data: 13/05/2025
* autor: sofia
* versao: 1.0
***********************************************************************************/

//import da biblioteca do prisma/client para executar os scripts SQL
const {PrismaClient}=require('@prisma/client')

//instancia (criar objeto a ser utilizado) a biblioteca do prisma/client
const prisma=new PrismaClient()


//funcao para inserir um novo FilmeGenero
const inserirFilmeDublagem=async function (FilmeDublagem) {
    try {
        let sql=`insert into tbl_filme_dublagem(
                                                id,
                                                id_idioma
                                                )
                                                values
                                                (
                                                ${FilmeDublagem.id},
                                                ${FilmeDublagem.id_idioma}
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
const updateFilmeDublagem=async function (FilmeDublagem) {
    try {
        let sql=`update tbl_filme_dublagem set id = '${FilmeDublagem.id}',
                                                    '${FilmeDublagem.id_idioma}'
                                                    where id = ${FilmeDublagem.id}`

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
const deleteFilmeDublagem=async function (id) {
    try {
        let sql=`delete from tbl_filme_dublagem where id = ${id}`

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
const selectAllFilmeDublagem=async function () {
    try {
        let sql='select * from tbl_filme_dublagem order by id desc'

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
const selectByIdFilmeDublagem=async function (id) {
    try {
        let sql=`select * from tbl_filme_dublagem where id = ${id}`

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
const selectFilmeByIdDublagem=async function (id_idioma) {
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                              inner join tbl_filme_dublagem
                                                on tbl_filme.id = tbl_filme_dublagem.id
                                              inner join tbl_idioma
                                                on tbl_idioma.id = tbl_filme_dublagem.id_idioma
                    where tbl_filme_dublagem.id_idioma = ${id_idioma}`
  
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
const selectDulagemByIdFilme=async function (id) {
    try {
        let sql=`select tbl_idioma.* from tbl_filme
                                            inner join tbl_filme_dublagem
                                                on tbl_filme.id = tbl_filme_dublagem.id
                                            inner join tbl_idioma.id = tbl_filme_dublagem.id_idioma
                    where tbl_filme_dublagem.id = ${id}`

        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
    } catch (error) {
        
    }
}


module.exports={
    inserirFilmeDublagem,
    updateFilmeDublagem,
    deleteFilmeDublagem,
    selectAllFilmeDublagem,
    selectByIdFilmeDublagem,
    selectFilmeByIdDublagem,
    selectDulagemByIdFilme
}
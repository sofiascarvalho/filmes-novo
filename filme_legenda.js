//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmeLegenda = async function(FilmeLegenda){
  try {

      let sql = `insert into tbl_filme_legenda  ( 
                                          id,
                                          id_legenda
                                        ) 
                                          values 
                                        (
                                          ${FilmeLegenda.id},
                                          ${FilmeLegenda.id_legenda}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateFilmeLegenda = async function(FilmeLegenda){
  try {
      let sql = `update tbl_filme_legenda set        id       = ${FilmeLegenda.id},
                                                    id_legenda      = ${FilmeLegenda.id_legenda}
                                        
                            where id = ${FilmeLegenda.id}                
                            `
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteFilmeLegenda = async function(id){
  try {
    let sql = `delete from tbl_filme_legenda where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllFilmeLegenda = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_legenda order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdFilmeLegenda = async function(id){
  try {
    let sql = `select * from tbl_filme_plataforma where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectFilmeByIdLegenda = async function(id_legenda){
  try {
      let sql = `select tbl_filme.* from tbl_filme 
                                            inner join tbl_filme_legenda
                                              on tbl_filme.id = tbl_filme_legenda.id
                                            inner join tbl_legenda
                                              on tbl_legenda.id = tbl_filme_legenda.id_legenda
                  where tbl_filme_legenda.id_legenda = ${id_legenda}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectLegendaByIdFilme = async function(id){
 try {
      let sql = `select tbl_legenda.* from tbl_filme 
                                            inner join tbl_filme_legenda
                                              on tbl_filme.id = tbl_filme_legenda.id
                                            inner join tbl_legenda
                                              on tbl_legenda.id = tbl_filme_legenda.id_legenda
                  where tbl_filme_legenda.id = ${id}`
                  
      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}


module.exports = {
     insertFilmeLegenda,
     updateFilmeLegenda,
     deleteFilmeLegenda,
     selectAllFilmeLegenda,
     selectByIdFilmeLegenda,
     selectFilmeByIdLegenda,
     selectLegendaByIdFilme
} 
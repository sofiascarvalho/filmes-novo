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



/****************************** TABELA USUARIO ******************************/
//funcao para inserir usuario
const inserirUsuario=async function (usuario) {
    try {
        let sql=`insert into tbl_usuario    (nome_usuario,
                                        email_usuario
                                        )
                                        values
                                        (
                                        '${usuario.nome_usuario}',
                                        '${usuario.email_usuario}'
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

//funcao para atualizar um usuario
const updateUsuario=async function (usuario) {
    try {
        let sql=`update tbl_usuario set nome_usuario = '${usuario.nome_usuario}',
                                        email_usuario = '${usuario.email_usuario}'
                                    where id = ${usuario.id_usuario}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}
//funcao para deletar usuario
const deleteUsuario=async function (id_usuario) {
    try {
        let sql=`delete from tbl_usuario where id = ${id_usuario}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}
//funcao para retornar todos os usuarios existentes
const selectAllUsuario=async function () {
    try {
        let sql=`select * from tbl_usuario order by id desc`

        let result=await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}
//funcao para buscar um usuario pelo id
const selectByIdUsuario=async function (id_usuario) {
   try {
    let sql=`select * from tbl_usuario where id = ${id_usuario}`

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
    inserirUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}

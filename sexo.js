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





/****************************** TABELA SEXO ******************************/
//funcao para inserir sexo
const inserirSexo=async function (sexo) {
    try {
        let sql=`insert into tbl_sexo   (sexo
                                    )
                                    values
                                    (
                                    '${sexo.sexo}'
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

//funcao para atualizar um sexo existente
const updateSexo= async function(sexo){
    try {
        let sql= `update tbl_filme set sexo = '${sexo.sexo}'
                                    where id = ${sexo.id_sexo}`

        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//funcao para excluir um sexo existente
const deleteSexo=async function (id_sexo) {
    try {
        let sql= `delete from tbl_filme where id = ${id_sexo}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//funcao para retornar todos os sexos existentes
const selectAllSexo=async function () {
    try {
        //script sql para retornar odos os dados
        let sql='select * from tbl_sexo order by id desc'

        //executa o script sql no bd e aguarda o retorno dos dados
        let result=await prisma.$queryRawUnsafe(sql)

            if(result)
                return result
            else
            return false
        
    } catch (error) {
        return false
    }
}

//funcao para buscar um sexo pelo id
const selectByIdSexo=async function (id_sexo) {
    try {
        let sql= `select * from tbl_filme where id = ${id_sexo}`

        let result= await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports={
    inserirSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}
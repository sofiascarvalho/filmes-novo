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
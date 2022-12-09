const { pool } = require('../config');

const getItens = (request, response) => {
    pool.query('SELECT * FROM itens ORDER BY codigo',
        (error, results) => {
            if (error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar o item: ' + error
                })
            }
            response.status(200).json(results.rows);
        }
    )
}

const addItens = (request, response) => {
    const {nome, descricao, custo } = request.body;
    pool.query(`INSERT INTO itens (nome, descricao, custo) 
    VALUES ($1, $2, $3) RETURNING codigo, nome, descricao, custo`,
    [nome, descricao, custo], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao inserir o item: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Item criado", 
            objeto : results.rows[0]
        })
    })
}

const updateItens = (request, response) => {
    const {codigo, nome, descricao, custo } = request.body;
    pool.query(`UPDATE itens SET nome=$1, descricao=$2, custo=$3
    WHERE codigo=$4 RETURNING codigo, nome, descricao, custo`,
    [nome, descricao, custo, codigo], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar o item: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Item alterado", 
            objeto : results.rows[0]
        })
    })
}

const deleteItem = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM itens WHERE codigo = $1`,[codigo], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover o item: ' +
                 (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Item removido"
        })
    })
}

const getItemPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM itens WHERE codigo = $1`,[codigo], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar o item: ' +
                 (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports =  { getItens, addItens, updateItens , deleteItem ,
    getItemPorCodigo}
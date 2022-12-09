const { pool } = require('../config');

const getLocais = (request, response) => {
    pool.query('SELECT * FROM locais ORDER BY codigo',
        (error, results) => {
            if (error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar o local: ' + error
                })
            }
            response.status(200).json(results.rows);
        }
    )
}

const addLocais = (request, response) => {
    const {nome, descricao, custo } = request.body;
    pool.query(`INSERT INTO locais (nome, descricao, custo) 
    VALUES ($1, $2, $3) RETURNING codigo, nome, descricao, custo`,
    [nome, descricao, custo], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao inserir o local: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Local criado", 
            objeto : results.rows[0]
        })
    })
}

const updateLocais = (request, response) => {
    const {codigo, nome, descricao, custo } = request.body;
    pool.query(`UPDATE locais SET nome=$1, descricao=$2, custo=$3
    WHERE codigo=$4 RETURNING codigo, nome, descricao, custo`,
    [nome, descricao, custo, codigo], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar o local: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Local alterado", 
            objeto : results.rows[0]
        })
    })
}

const deleteLocal = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM locais WHERE codigo = $1`,[codigo], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover o local: ' +
                 (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Local removido"
        })
    })
}

const getLocalPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM locais WHERE codigo = $1`,[codigo], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar o local: ' +
                 (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports =  { getLocais, addLocais, updateLocais , deleteLocal ,
    getLocalPorCodigo}
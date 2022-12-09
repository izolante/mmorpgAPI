const { pool } = require('../config');
const { request, response } = require("express");

const getCriaturas = (request, response) => {
    pool.query(`select s.codigo as codigo, s.nome as nome, 
        s.descricao as descricao, s.nivelbase as nivelbase, 
        s.local as local, p.nome as nomelocal
        from criaturas s
        join locais p on s.local = p.codigo
        order by s.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar as criaturas: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addCriatura = (request, response) => {
    const {nome, descricao, nivelbase, local} = request.body;
    pool.query(`insert into criaturas (nome, descricao, nivelbase, local) 
    values ($1, $2, $3, $4)
    returning codigo, nome, descricao, nivelbase, local`, 
    [nome, descricao, nivelbase, local] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir a criatura!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Criatura criada!",
            objeto : results.rows[0]
        });
    })
}

const updateCriatura = (request, response) => {
    const {codigo, nome, descricao, nivelbase, local} = request.body;
    pool.query(`UPDATE criaturas
	SET nome=$1, descricao=$2, nivelbase=$3, local=$4
	WHERE codigo=$5
returning codigo, nome, descricao, nivelbase, local`, 
    [nome, descricao, nivelbase, local, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar a criatura!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Criatura atualizada!",
            objeto : results.rows[0]
        });
    })
}


const deleteCriatura = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM criaturas WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover a criatura! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Criatura removida!"
        });
    })
}

const getCriaturaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM criaturas WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar a criatura!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports =  { getCriaturas, addCriatura, updateCriatura , deleteCriatura ,
    getCriaturaPorCodigo}
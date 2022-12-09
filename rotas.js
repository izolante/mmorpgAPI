const { Router } = require('express');

const controleLocais = require("./controladores/locais");
const controleItens = require("./controladores/itens");
const controleCriaturas = require("./controladores/criaturas");

const rotas = new Router();

rotas.route('/locais')
   .get(controleLocais.getLocais)
   .post(controleLocais.addLocais)
   .put(controleLocais.updateLocais)

rotas.route('/locais/:codigo')
   .delete(controleLocais.deleteLocal)
   .get(controleLocais.getLocalPorCodigo)

rotas.route('/itens')
   .get(controleItens.getItens)
   .post(controleItens.addItens)
   .put(controleItens.updateItens)

rotas.route('/itens/:codigo')
   .delete(controleItens.deleteItem)
   .get(controleItens.getItemPorCodigo)

   rotas.route('/criaturas')
   .get(controleCriaturas.getCriaturas)
   .post(controleCriaturas.addCriatura)
   .put(controleCriaturas.updateCriatura)

rotas.route('/criaturas/:codigo')
   .delete(controleCriaturas.deleteCriatura)
   .get(controleCriaturas.getCriaturaPorCodigo)

module.exports = rotas;
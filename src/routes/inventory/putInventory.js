//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O INVENTARIO EXISTE
    const inventory = await schemaInventory.findByPk(req.params.id);
    if(!inventory){
      res.status(404).json({
        error: 'Inventory not found',
        message: `That inventory you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //VERIFICA SE O PRODUTO ESTA MORCADO COMO DELETADO, CASO ESTEJA RETORNA ERRO
    const product = await schemaProduct.findByPk(inventory.FK_PRODUCT_ID);
    if(product.PRODUCT_DELETED) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'This product has been subject to soft deletion. Undo the deletion to register an order with it.',
        code: 400
      });
    }

    //SALVA O NOVO VALOR
    inventory.INVENTORY_QUANTITY = parseInt(req.body.INVENTORY_QUANTITY);

    //EXECUTA O PUT
    await inventory.save();

    //RETORNA O RESULTADO
    res.status(200).json(inventory);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');

//REQUISIÇÃO HTTP
router.get('/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O INVENTARIO EXISTE
    const inventory = await schemaInventory.findByPk(req.params.id);
    if(!inventory){
      return res.status(404).json({
        error: 'Inventory not found',
        messege: `That inventory you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //RETORNA O RESULTADO
    res.status(200).json(inventory);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this inventory due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router; 
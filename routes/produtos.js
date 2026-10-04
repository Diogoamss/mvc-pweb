const express = require('express');
const router = express.Router();
const c = require('../controllers/produtoController');

router.get('/', c.listar);
router.get('/novo', c.formNovo);
router.post('/', c.criar);
router.get('/categoria/:id', c.porCategoria);
router.get('/:id/editar', c.formEditar);
router.post('/:id/editar', c.atualizar);
router.post('/:id/excluir', c.excluir);

module.exports = router;

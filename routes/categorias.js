const express = require('express');
const router = express.Router();
const c = require('../controllers/categoriaController');

router.get('/', c.listar);
router.post('/', c.criar);
router.post('/:id/excluir', c.excluir);

module.exports = router;

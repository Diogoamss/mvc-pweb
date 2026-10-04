const { Categoria, Produto } = require('../models');

const buscarTodas = () =>
  Categoria.findAll({
    include: { model: Produto, as: 'produtos', attributes: ['id'] },
    order: [['nome', 'ASC']],
  });

exports.listar = async (req, res) => {
  res.render('categorias/index', { categorias: await buscarTodas(), erro: null, titulo: 'Categorias' });
};

exports.criar = async (req, res) => {
  try {
    await Categoria.create({ nome: (req.body.nome || '').trim() });
    res.redirect('/categorias');
  } catch (e) {
    res.status(400).render('categorias/index', {
      categorias: await buscarTodas(),
      erro: 'Nome inválido ou categoria já existente.',
      titulo: 'Categorias',
    });
  }
};

exports.excluir = async (req, res) => {
  await Produto.update({ categoriaId: null }, { where: { categoriaId: req.params.id } });
  await Categoria.destroy({ where: { id: req.params.id } });
  res.redirect('/categorias');
};

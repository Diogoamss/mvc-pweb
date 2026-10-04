const { Op } = require('sequelize');
const { Produto, Categoria } = require('../models');

exports.listar = async (req, res) => {
  const busca = (req.query.busca || '').trim();
  const where = busca ? { nome: { [Op.like]: `%${busca}%` } } : {};
  const produtos = await Produto.findAll({
    where,
    include: { model: Categoria, as: 'categoria' },
    order: [['id', 'ASC']],
  });
  res.render('produtos/index', { produtos, busca, titulo: 'Produtos' });
};

exports.formNovo = async (req, res) => {
  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
  res.render('produtos/form', { produto: null, categorias, titulo: 'Novo produto' });
};

exports.criar = async (req, res) => {
  const { nome, preco, quantidade, categoriaId } = req.body;
  await Produto.create({ nome, preco, quantidade, categoriaId: categoriaId || null });
  res.redirect('/produtos');
};

exports.formEditar = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).send('Produto não encontrado');
  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
  res.render('produtos/form', { produto, categorias, titulo: 'Editar produto' });
};

exports.atualizar = async (req, res) => {
  const { nome, preco, quantidade, categoriaId } = req.body;
  await Produto.update(
    { nome, preco, quantidade, categoriaId: categoriaId || null },
    { where: { id: req.params.id } }
  );
  res.redirect('/produtos');
};

exports.excluir = async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } });
  res.redirect('/produtos');
};

// Desafio 2: produtos de uma categoria
exports.porCategoria = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).send('Categoria não encontrada');
  const produtos = await Produto.findAll({
    where: { categoriaId: categoria.id },
    include: { model: Categoria, as: 'categoria' },
    order: [['id', 'ASC']],
  });
  res.render('produtos/index', {
    produtos,
    busca: '',
    titulo: `Produtos da categoria: ${categoria.nome}`,
    categoriaAtual: categoria,
  });
};

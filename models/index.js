const sequelize = require('./database');
const Produto = require('./Produto');
const Categoria = require('./Categoria');

// Um produto pertence a uma categoria; uma categoria possui vários produtos.
Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = { sequelize, Produto, Categoria };

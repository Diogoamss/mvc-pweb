const express = require('express');
const path = require('path');
const logger = require('morgan');
const { sequelize } = require('./models');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/produtos'));
app.use('/produtos', require('./routes/produtos'));
app.use('/categorias', require('./routes/categorias'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
});

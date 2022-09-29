require('dotenv').config();
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const actorsRoutes = require('./routes/actorsRoutes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/movies', moviesRoutes);
app.use(genresRoutes);
app.use(actorsRoutes);

app.listen('3001', () => console.log('Server running on http://localhost:3001/'));

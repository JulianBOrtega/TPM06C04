const moment = require('moment');
const db = require('../database/models')

module.exports = 
{
    list: (req, res) => 
    {
        db.Movie.findAll()
            .then((movies) =>
            {
                return res.render('moviesList', {movies})
            })
            .catch(err => console.log(err));
    },
    new: (req, res) => 
    {
        const queryOps =
        {
            order: [['release_date', 'DESC']]
        };

        db.Movie.findAll(queryOps)
            .then(movies => res.render('moviesList', {movies}))
            .catch(err => console.log(err));
    },
    recommended: (req, res) => 
    {
        //! Consigna: Deberá mostrar las últimas 5 películas ordenadas según su fecha de estreno.
        //! Texto de ayuda: [...] En este caso necesitaremos agregar el parámetro de configuración where. [...]
        //! ??????????????? Por qué? La consigna solo pide ordernar según fecha y mostrar las últimas 5 películas.
        
        //* A menos que se refiera a hacer: (lo dejo aquí por si acaso...)
        /*
            const Op = db.Sequelize.Op;
            
            const queryOps =
            {
                where: { rating: {[Op.gte]: 9}},
                order: [['release_date', 'DESC']],
                limit: 5
            }
        */ 

        const queryOps =
        {
            order: [['release_date', 'DESC']],
            limit: 5
        }

        db.Movie.findAll(queryOps)
            .then(movies => res.render('moviesList', {movies}))
            .catch(err => console.log(err));
    },
    detail: (req, res) => 
    {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail', {movie}))
            .catch(err => console.log(err));
    },
    add: function (req, res) {

        const queryOps =
        {
            order: ['name']
        }

        db.Genre.findAll(queryOps)
        .then(genres => res.render('moviesAdd', {genres}))
        .catch(err => console.log(err));
    },
    create: function (req, res) {
        const {title, release_date, rating, awards, genre_id, length} = req.body;

        db.Movie.create
        ({
            ...req.body,
            title: title.trim(),
        })
            .then(movie => 
            {
                console.log(movie);
                return res.redirect('/movies/detail/' + movie.id)
            })
            .catch(err => console.log(err));
    },
    edit: function(req, res) {
        
        const queryOps =
        {
            order: ['name']
        }

        let genres = db.Genre.findAll(queryOps);
        let movie = db.Movie.findByPk(req.params.id);

        Promise.all([genres, movie])
        .then(([genres, movie]) => res.render('moviesEdit', {genres, movie, moment}))
        .catch(err => console.log(err));

    },
    update: function (req,res) {
        db.Movie.update(
            {
                ...req.body,
                title: req.body.title.trim()
            },
            {
                where: {id: req.params.id}
            }
        )
            .then(response =>res.redirect('/movies/detail/' + req.params.id))
            .catch(err => console.log(err));

    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDelete', { movie}))
            .catch(err => console.log(err));
    },
    destroy: function (req, res) {

        const queryOps = 
        {
            where: { id: req.params.id}
        };

        db.Movie.destroy(queryOps)
            .then(() => res.redirect('/movies'))
            .catch(err => console.log(err));
    }

}
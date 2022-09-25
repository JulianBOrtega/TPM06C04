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
}
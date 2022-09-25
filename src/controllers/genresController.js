const db = require('../database/models')

module.exports = 
{
    list: (req, res) => 
    {
        db.Genre.findAll()
            .then((genres) =>
            {
                return res.render('genresList', {genres})
            })
            .catch(err => console.log(err));
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => res.render('genresDetail', {genre}))
            .catch(err => console.log(err))
    }
}
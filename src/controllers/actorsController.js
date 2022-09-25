const db = require('../database/models')

module.exports = 
{
    list: (req, res) => 
    {
        db.Actor.findAll()
            .then((actors) =>
            {
                return res.render('actorsList', {actors})
            })
            .catch(err => console.log(err));
    },
    detail: (req, res) => 
    {
        db.Actor.findByPk(req.params.id)
            .then(actor => res.render('actorsDetail', {actor}))
            .catch(err => console.log(err))
    }
}
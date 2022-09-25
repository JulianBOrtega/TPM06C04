module.exports = (sequelize, dataTypes) => 
{
    const alias = "Movie";
    
    //* Datatypes doc: https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
    const cols = 
    {
        id: 
        {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title:
        {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating:
        {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards:
        {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        release_date: 
        {
            type: dataTypes.DATE,
            allowNull: false
        },
        length: 
        {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        genre_id: 
        {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: null
        }
    };
    
    const config = 
    {
        tableName: 'movies',
        timestamps: true, //! Si no existen, poner false
        underscored: true, //! Si timeStamps tienen '_', poner true
    };
    
    const Movie = sequelize.define(alias, cols, config);

    return Movie;
}
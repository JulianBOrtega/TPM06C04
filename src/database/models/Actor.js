module.exports = (sequelize, dataTypes) => 
{
    const alias = "Actor";
    
    const cols = 
    {
        id: 
        {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name:
        {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name:
        {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating:
        {
            type: dataTypes.DECIMAL(3, 1),
        },
        favorite_movie_id:
        {
            type: dataTypes.INTEGER.UNSIGNED
        }
    };
    
    const config = 
    {
        tableName: 'actors',
        timestamps: true, //! Si no existen, poner false
        underscored: true, //! Si timeStamps tienen '_', true
    };
    
    const Actor = sequelize.define(alias, cols, config);

    return Actor;
}
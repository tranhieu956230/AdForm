module.exports = (sequelize, Sequelize) => {
    const AdCareer = sequelize.define('adcareer', {
        ad_id:{
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
        }
    },{
        timestamps: false
    });
    return AdCareer;
}
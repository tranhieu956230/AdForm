module.exports = (sequelize, Sequelize) => {
    const AdBase = sequelize.define('adbase', {
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
    return AdBase;
}
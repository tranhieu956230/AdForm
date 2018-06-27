module.exports = (sequelize, Sequelize) => {
    const AdType = sequelize.define('adtype', {
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
    return AdType;
}
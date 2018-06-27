module.exports = (sequelize, Sequelize) => {
    const AdPurpose = sequelize.define('adpurpose', {
        ad_id:{
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
        }
    },{
        timestamps: false,
    });
    return AdPurpose;
}
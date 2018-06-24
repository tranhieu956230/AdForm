module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define('item', {

        link: {
            type: Sequelize.STRING,
        },
        thumb: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        postDate: {
            type: Sequelize.STRING,
        },
        link_embed: {
            type: Sequelize.TEXT,
        },
        adcareerID: {
            type: Sequelize.INTEGER
        },
        adpurposeID: {
            type: Sequelize.INTEGER,
        },
        adtypeID: {
            type: Sequelize.STRING
        },
        adbaseID: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    });
    return Item;
}
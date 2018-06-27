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
        post_date: {
            type: Sequelize.STRING,
        },
        link_embed: {
            type: Sequelize.TEXT,
        },
    }, {
            timestamps: false
        });
    return Item;
}
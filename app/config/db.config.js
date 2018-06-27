const env = require('./env')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.user, env.password, {
    host: env.host,
    dialect: env.dialect,
    pool: env.pool,
})


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.adcareer = require('../models/adcareer.model')(sequelize, Sequelize);
db.adpurpose = require('../models/adpurpose.model')(sequelize, Sequelize);
db.adtype = require('../models/adtype.model')(sequelize, Sequelize);
db.adbase = require('../models/adbase.model')(sequelize, Sequelize);
db.item = require('../models/item.model')(sequelize, Sequelize);

db.adbase.belongsToMany(db.item, { through: 'item_adbase', foreignKey: 'adbase_id', otherKey: 'item_id', timestamps: false });
db.item.belongsToMany(db.adbase, { through: 'item_adbase', foreignKey: 'item_id', otherKey: 'adbase_id', timestamps: false });

db.adcareer.belongsToMany(db.item, { through: 'item_adcareer', foreignKey: 'adcareer_id', otherKey: 'item_id', timestamps: false });
db.item.belongsToMany(db.adcareer, { through: 'item_adcareer', foreignKey: 'item_id', otherKey: 'adcareer_id', timestamps: false });

db.adpurpose.belongsToMany(db.item, { through: 'item_adpurpose', foreignKey: 'adpurpose_id', otherKey: 'item_id', timestamps: false });
db.item.belongsToMany(db.adpurpose, { through: 'item_adpurpose', foreignKey: 'item_id', otherKey: 'adpurpose_id', timestamps: false });

db.adtype.belongsToMany(db.item, { through: 'item_adtype', foreignKey: 'adtype_id', otherKey: 'item_id', timestamps: false });
db.item.belongsToMany(db.adtype, { through: 'item_adtype', foreignKey: 'item_id', otherKey: 'adtype_id', timestamps: false });

module.exports = db;

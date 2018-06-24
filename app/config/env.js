module.exports = {
    database: 'test',
    user: 'root',
    password: 'Hieu956230',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
    }
}
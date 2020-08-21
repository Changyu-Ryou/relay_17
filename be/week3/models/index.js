const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

// 아래는 로컬이라 서버에 올릴땐 주석처리 필요
const config2 = require('../../../../../config.json')[env];
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let db = {};

const sequelize = new Sequelize(config.database, config.username, config2.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;

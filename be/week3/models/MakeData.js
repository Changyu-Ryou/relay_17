const mysql = require('mysql');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db_info = {
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
}
const nameArr = [
    'remind',         'phenomen',  'tune',          'meanwhile',
    'decorate',       'sculpture',   'import',        'take',
    'course',         'costume',     'stream',        'merge',
    'current',        'inraction', 'likewise',      'herdsman',
    'graze',          'cattle',      'crop',          'logger',
    'manufacre',    'timber',      'dump',          'toxic',
    'away',           'with',        'indepntly', 'maximize',
    'ultimely',     'renewable',   'yield',         'dimish',
    'vanish',         'trap',        'Medieval',      'stable',
    'urban',          'expel',       'altigether',    'barn',
    'English',        'despise',     'encyclopa',  'adopt',
    'volume',         'physical',    'content',       'access',
    'subsion',   'extend',      'thus',          'trantion',
    'prime',          'minister',    'aware',         'ingdient',
    'gaze',           'single',      'fraction',      'momtary',
    'regular',        'leak',        'minimize',      'revoing',
    'airtight',       'spin',        'state',         'anazing',
    'tranmation', 'blossom',     'stem',          'shade',
    'container',      'bouquet',     'arrange',       'boarding',
    'reason',         'aircraft',    'reduce',        'fuel',
    'initially',      'intend',      'lasting',       'expand',
    'positive',       'carbon',      'dioxide',       'emission',
    'measure',        'output',      'official',      'mainly',
    'date',           'back',        'conference',    'transport',
    'vehicle',        'specialist',  'visible',       'once'
];
const schoolArr = ["부캠초등학교", "부캠중학교", "부캠고등학교", "부캠대학교"];
const favorsArr = ["한식", "중식", "양식", "일식", "분식"];

class MakeData{
    static makeName() {
        return nameArr[Math.trunc(Math.random()*nameArr.length)];
    }
    static makeSchool() {
        return schoolArr[Math.trunc(Math.random()*schoolArr.length)];
    }
    static makeFavors() {
        return favorsArr[Math.trunc(Math.random()*favorsArr.length)];
    }
    static makeGraduatedYear() {
        return Math.trunc(Math.random()*20 + 2000);
    }
    static makeQuery(database) {
        return `insert into users (name, school, favors, graduated_year) values ('${MakeData.makeName()}', '${MakeData.makeSchool()}', '${MakeData.makeFavors()}', '${MakeData.makeGraduatedYear()}');`;
    }
}

const connection = mysql.createConnection(db_info);
console.log(connection.connect());

for(let i = 0; i < 1000; i++) {
    connection.query(MakeData.makeQuery('user'), (error) => {
        if(error) throw error;
    });
}
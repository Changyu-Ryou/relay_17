module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        school: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        favors: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        graduatedYear: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'users'
    });
};
export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            img: {
                type: DataTypes.STRING,
                defaultValue: 'default.png'
            },
            google: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            indexes: [],
            tableName: 'tb_usuarios',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true
        }
    );
    User.associate = models => {
        User.belongsTo(models.Rol, {
          as: 'rol',
          foreignKey: {
            name: 'rolId',
            allowNull: false,
          },
        });
    };

    return User;
};
export default (sequelize, DataTypes) => {
    const Media = sequelize.define(
        'Media', {
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
            tamanno: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mime_type: {
                type: DataTypes.STRING,
                allowNull: false
            },

        }, {
            indexes: [],
            tableName: 'tb_medias',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true
        }
    );

    Media.associate = models => {
        Media.belongsTo(models.User, {
            as: 'publicadaPor',
            foreignKey: {
                name: 'usuarioId',
                allowNull: false
            }
        });
    };

    return Media;
};
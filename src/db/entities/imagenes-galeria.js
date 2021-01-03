export default (sequelize, DataTypes) => {
    const ImagenesGaleria = sequelize.define(
        'ImagenesGaleria', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nombreImagen: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            indexes: [],
            tableName: 'tb_imagenes_galeria',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true
        }
    );
    ImagenesGaleria.associate = models => {
        ImagenesGaleria.belongsTo(models.Galeria, {
            as: 'galeria',
            foreignKey: {
                name: 'galeriaId',
                allowNull: false,
            },
        });
    }
    return ImagenesGaleria;
};
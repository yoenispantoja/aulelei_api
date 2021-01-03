export default (sequelize, DataTypes) => {
    const CategoriaGaleria = sequelize.define(
        'CategoriaGaleria', {
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
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            indexes: [],
            tableName: 'tb_categorias_galerias',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true
        }
    );


    return CategoriaGaleria;
};
export default (sequelize, DataTypes) => {
    const Galeria = sequelize.define(
        'Galeria', {
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
            imagenPortada: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            indexes: [],
            tableName: 'tb_galerias',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true
        }
    );

    Galeria.associate = models => {
        Galeria.belongsTo(models.User, {
            as: 'publicadaPor',
            foreignKey: {
                name: 'usuarioId',
                allowNull: false
            }
        });
        Galeria.belongsTo(models.CategoriaGaleria, {
            as: 'categoria',
            foreignKey: {
                name: 'categoriaId',
                allowNull: false
            }
        });
        Galeria.belongsTo(models.EstadoPublicacion, {
            as: 'estado',
            foreignKey: {
                name: 'estadoId',
                allowNull: false
            }
        });
        Galeria.hasMany(models.ImagenesGaleria, {
            as: 'imagenes',
            foreignKey: {
                name: 'galeriaId',
                allowNull: false,
            },
        });

    };

    return Galeria;
};
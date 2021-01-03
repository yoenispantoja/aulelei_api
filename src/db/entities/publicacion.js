export default (sequelize, DataTypes) => {
  const Publicacion = sequelize.define(
    'Publicacion',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagenDestacada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      meta_descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      palabras_clave: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      indexes: [],
      tableName: 'tb_publicaciones',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );

  Publicacion.associate = (models) => {
    Publicacion.belongsTo(models.User, {
      as: 'publicadaPor',
      foreignKey: {
        name: 'usuarioId',
        allowNull: false,
      },
    });
    Publicacion.belongsTo(models.CategoriaPublicacion, {
      as: 'categoria',
      foreignKey: {
        name: 'categoriaId',
        allowNull: false,
      },
    });
    Publicacion.belongsTo(models.EstadoPublicacion, {
      as: 'estado',
      foreignKey: {
        name: 'estadoId',
        allowNull: false,
      },
    });
    //Su agenda de reservas
    Publicacion.hasMany(models.Comentario, {
      as: 'comentarios',
      foreignKey: {
        name: 'publicacionId',
        allowNull: false,
      },
    });
  };

  return Publicacion;
};

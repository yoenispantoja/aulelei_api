export default (sequelize, DataTypes) => {
  const CategoriaServicio = sequelize.define(
    'CategoriaServicio',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [],
      tableName: 'tb_categorias_servicios',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );
  
    CategoriaServicio.associate = models => {
    CategoriaServicio.hasMany(models.Servicio, {
      as: 'servicios',
      foreignKey: {
        name: 'categoriaId',
        allowNull: false,
      },
    });
  }

  return CategoriaServicio;
};

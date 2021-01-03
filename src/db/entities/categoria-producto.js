export default (sequelize, DataTypes) => {
  const CategoriaProducto = sequelize.define(
    'CategoriaProducto',
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
      tableName: 'tb_categorias_productos',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );

  CategoriaProducto.associate = models => {
    CategoriaProducto.hasMany(models.Producto, {
      as: 'productos',
      foreignKey: {
        name: 'categoriaId',
        allowNull: false,
      },
    });
  }
  return CategoriaProducto;
};

export default (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    'Producto',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      um: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      indexes: [],
      tableName: 'tb_productos',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );
  Producto.associate = (models) => {
    Producto.belongsTo(models.CategoriaProducto, {
      as: 'categoria',
      foreignKey: {
        name: 'categoriaId',
        allowNull: false,
      },
    });
  };

  return Producto;
};

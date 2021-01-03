export default (sequelize, DataTypes) => {
  const Servicio = sequelize.define(
    'Servicio',
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
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
	  activo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
    },
    {
      indexes: [],
      tableName: 'tb_servicios',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );
  Servicio.associate = models => {
    Servicio.belongsTo(models.CategoriaServicio, {
      as: 'categoria',
      foreignKey: {
        name: 'categoriaId',
        allowNull: false,
      },
    });
    Servicio.belongsToMany(models.Trabajador, {
      as: 'trabajadores',
      through: 'tb_trabajador_servicio'
    });
  }

  return Servicio;
};

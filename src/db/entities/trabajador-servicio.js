export default (sequelize, DataTypes) => {
  const TrabajadorServicio = sequelize.define(
    'TrabajadorServicio',
	{},{
        indexes: [],
        tableName: 'tb_trabajador_servicio',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        timestamps: true,
      }   
  );
  TrabajadorServicio.removeAttribute('id');

  TrabajadorServicio.associate = (models) => {
    TrabajadorServicio.belongsTo(models.Trabajador, {
      as: 'trabajador',
	  primaryKey: true,
      foreignKey: {
        name: 'trabajadorId',
        allowNull: false,
      },
    });
    TrabajadorServicio.belongsTo(models.Servicio, {
      as: 'servicio',
	  primaryKey: true,
      foreignKey: {
        name: 'servicioId',
        allowNull: false,
      },
    });
  };

  return TrabajadorServicio;
};

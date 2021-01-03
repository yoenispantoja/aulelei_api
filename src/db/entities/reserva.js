export default (sequelize, DataTypes) => {
  const Reserva = sequelize.define(
    'Reserva',
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
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hora: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [],
      tableName: 'tb_reservas',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );
  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Servicio, {
      as: 'servicio',
      foreignKey: {
        name: 'servicioId',
        allowNull: false,
      },
    });
    Reserva.belongsTo(models.Trabajador, {
      as: 'trabajador',
      foreignKey: {
        name: 'trabajadorId',
        allowNull: false,
      },
    });
    Reserva.belongsTo(models.User, {
      as: 'usuario',
      foreignKey: {
        name: 'usuarioId',
        allowNull: false,
      },
    });
  };

  return Reserva;
};

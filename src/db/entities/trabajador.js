export default (sequelize, DataTypes) => {
  const Trabajador = sequelize.define(
    'Trabajador',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      ci: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      indexes: [],
      tableName: 'tb_trabajadores',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );

  Trabajador.associate = (models) => {
    Trabajador.belongsTo(models.User, {
      as: 'usuario',
      foreignKey: {
        name: 'usuarioId',
        allowNull: false,
      },
    });
    Trabajador.belongsTo(models.TurnoServicio, {
      as: 'turno',
      foreignKey: {
        name: 'turnoServicioId',
        allowNull: false,
      },
    });
    //Definiendo sus servicios
    Trabajador.belongsToMany(models.Servicio, {
      as: 'servicios',
      through: 'tb_trabajador_servicio',
    });
    //Su agenda de reservas
    Trabajador.hasMany(models.Reserva, {
      as: 'reservas',
      foreignKey: {
        name: 'trabajadorId',
        allowNull: false,
      },
    });
  };

  return Trabajador;
};

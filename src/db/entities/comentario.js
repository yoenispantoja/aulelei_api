export default (sequelize, DataTypes) => {
  const Comentario = sequelize.define(
    'Comentario',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [],
      tableName: 'tb_comentarios',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    }
  );

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Publicacion, {
      as: 'publicacion',
      foreignKey: {
        name: 'publicacionId',
        allowNull: false,
      },
    });
  };

  return Comentario;
};

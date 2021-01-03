export default (sequelize, DataTypes) => {
    const Session = sequelize.define(
      'Session',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        token: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        indexes: [],
        tableName: 'tb_sesiones',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        timestamps: true,
      }
    );

    Session.associate = models => {
        Session.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
    };

    return Session;
};
export default (sequelize, DataTypes) => {
    const Evento = sequelize.define(
        'Evento', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            foto: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lugar: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fechaInicio: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fechaFin: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            indexes: [],
            tableName: 'tb_eventos',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true
        }
    );

    Evento.associate = models => {
        Evento.belongsTo(models.User, {
            as: 'publicadoPor',
            foreignKey: {
                name: 'usuarioId',
                allowNull: false
            }
        });

    };

    return Evento;
};
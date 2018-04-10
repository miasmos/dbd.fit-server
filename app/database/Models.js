import { DataTypes } from 'sequelize';

export class Models {
    constructor(connection) {
        this.connection = connection;

        this.namedBuilds = connection.define(
            'NamedBuilds',
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    field: 'id',
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    field: 'name',
                    allowNull: false
                },
                hash: {
                    type: DataTypes.STRING,
                    field: 'hash',
                    allowNull: false
                },
                buildHash: {
                    type: DataTypes.STRING,
                    field: 'build',
                    allowNull: false
                },
                offering: {
                    type: DataTypes.STRING,
                    field: 'offering',
                    allowNull: true
                },
                perkOneTier: {
                    type: DataTypes.INTEGER,
                    field: 'perkOneTier',
                    allowNull: true
                },
                perkTwoTier: {
                    type: DataTypes.INTEGER,
                    field: 'perkTwoTier',
                    allowNull: true
                },
                perkThreeTier: {
                    type: DataTypes.INTEGER,
                    field: 'perkThreeTier',
                    allowNull: true
                },
                perkFourTier: {
                    type: DataTypes.INTEGER,
                    field: 'perkFourTier',
                    allowNull: true
                }
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ['hash']
                    }
                ],
                freezeTableName: true
            }
        );
        this.namedBuilds.sync();

        this.builds = connection.define(
            'Builds',
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    field: 'id',
                    primaryKey: true
                },
                player: {
                    type: DataTypes.STRING,
                    field: 'player',
                    allowNull: false
                },
                type: {
                    type: DataTypes.INTEGER,
                    field: 'type',
                    allowNull: false
                },
                power: {
                    type: DataTypes.STRING,
                    field: 'power',
                    allowNull: false
                },
                addonOne: {
                    type: DataTypes.STRING,
                    field: 'addonOne',
                    allowNull: false
                },
                addonTwo: {
                    type: DataTypes.STRING,
                    field: 'addonTwo',
                    allowNull: false
                },
                perkOne: {
                    type: DataTypes.STRING,
                    field: 'perkOne',
                    allowNull: false
                },
                perkTwo: {
                    type: DataTypes.STRING,
                    field: 'perkTwo',
                    allowNull: false
                },
                perkThree: {
                    type: DataTypes.STRING,
                    field: 'perkThree',
                    allowNull: false
                },
                perkFour: {
                    type: DataTypes.STRING,
                    field: 'perkFour',
                    allowNull: false
                },
                hash: {
                    type: DataTypes.STRING,
                    field: 'hash',
                    allowNull: false
                }
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ['hash']
                    }
                ],
                freezeTableName: true
            }
        );
        this.builds.sync();
    }
}

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
                buildURI: {
                    type: DataTypes.STRING,
                    field: 'build_uri',
                    allowNull: false
                },
                buildHash: {
                    type: DataTypes.STRING,
                    field: 'build_hash',
                    allowNull: false
                },
                perkOneTier: {
                    type: DataTypes.INTEGER,
                    field: 'perk_one_tier',
                    allowNull: true
                },
                perkTwoTier: {
                    type: DataTypes.INTEGER,
                    field: 'perk_two_tier',
                    allowNull: true
                },
                perkThreeTier: {
                    type: DataTypes.INTEGER,
                    field: 'perk_three_tier',
                    allowNull: true
                },
                perkFourTier: {
                    type: DataTypes.INTEGER,
                    field: 'perk_four_tier',
                    allowNull: true
                },
                perkOne: {
                    type: DataTypes.STRING,
                    field: 'perk_one',
                    allowNull: true
                },
                perkTwo: {
                    type: DataTypes.STRING,
                    field: 'perk_two',
                    allowNull: true
                },
                perkThree: {
                    type: DataTypes.STRING,
                    field: 'perk_three',
                    allowNull: true
                },
                perkFour: {
                    type: DataTypes.STRING,
                    field: 'perk_four',
                    allowNull: true
                }
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ['build_uri']
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
                    allowNull: true
                },
                addonOne: {
                    type: DataTypes.STRING,
                    field: 'addon_one',
                    allowNull: true
                },
                addonTwo: {
                    type: DataTypes.STRING,
                    field: 'addon_two',
                    allowNull: true
                },
                perkOne: {
                    type: DataTypes.STRING,
                    field: 'perk_one',
                    allowNull: true
                },
                perkTwo: {
                    type: DataTypes.STRING,
                    field: 'perk_two',
                    allowNull: true
                },
                perkThree: {
                    type: DataTypes.STRING,
                    field: 'perk_three',
                    allowNull: true
                },
                perkFour: {
                    type: DataTypes.STRING,
                    field: 'perk_four',
                    allowNull: true
                },
                offering: {
                    type: DataTypes.STRING,
                    field: 'offering',
                    allowNull: true
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

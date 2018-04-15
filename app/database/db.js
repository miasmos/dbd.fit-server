import { Sequelize } from 'sequelize';
import { Models } from './Models';
import { Builds } from './tables/Builds';
import { NamedBuilds } from './tables/NamedBuilds';
import { BuildStats } from './tables/BuildStats';
import { Stats } from './tables/Stats';

let instance = undefined;

export class Database {
    constructor(credentials) {
        if (!instance) instance = this;
        else return instance;

        this.user = credentials.user;
        this.password = credentials.password;
        this.host = credentials.host;
        this.port = credentials.port;
        this.database = credentials.database;
        this.connection = undefined;
        this.connect();

        this.models = new Models(this.connection);
        this.builds = new Builds(this.models.builds);
        this.namedBuilds = new NamedBuilds(this.models.namedBuilds);
        this.stats = new Stats(this.models.stats);
        this.buildStats = new BuildStats(this.models.buildStats);

        return instance;
    }

    connect() {
        this.connection = new Sequelize(
            this.database,
            this.user,
            this.password,
            {
                host: this.host,
                port: this.port || 5432,
                logging: false,
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        );
    }
}

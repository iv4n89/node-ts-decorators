import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";


export const appDataSource: DataSource = new DataSource({
    type: <any>process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'secr3t!',
    database: process.env.MYSQL_DATABASE || 'ActivityCompanion',
    entities: ['Models/**/*{.js,.ts}'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    dropSchema: false,
    migrations: ['Database/migrations/**/*{.js,.ts}'],
    migrationsRun: false,
    name: 'mysql',
    migrationsTableName: 'node_migrations'
});
import { DataSource } from 'typeorm';
import { SQLiteService } from './sqlite/sqlite.service';
import { Contributor } from 'src/app/models/entities/contributor';
import { Init } from './migrations/init';

const sqliteService = new SQLiteService();
const sqliteConnection = sqliteService.getSqliteConnection();

export default new DataSource({
    name: 'perfliteConnection',
    type: 'capacitor',
    driver: sqliteConnection,
    database: 'perflite-db',
    mode: 'no-encryption',
    entities: [Contributor],
    migrations: [Init],
    subscribers: [],
    logging: [/*'query',*/ 'error', 'schema'],
    synchronize: false,
    migrationsRun: false
});

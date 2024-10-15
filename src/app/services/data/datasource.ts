import { DataSource } from 'typeorm';
import { SQLiteService } from './sqlite/sqlite.service';
import { Contributor } from 'src/app/models/entities/contributor';

const sqliteService = new SQLiteService();
const sqliteConnection = sqliteService.getSqliteConnection();

export default new DataSource({
    name: 'perfliteConnection',
    type: 'capacitor',
    driver: sqliteConnection,
    database: 'perflite-db',
    mode: 'no-encryption',
    entities: [Contributor],
    //   migrations: [InitializeAuthorPost1671880018001],
    subscribers: [],
    logging: [/*'query',*/ 'error', 'schema'],
    synchronize: true,
    migrationsRun: false
});

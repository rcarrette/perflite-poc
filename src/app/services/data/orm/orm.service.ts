import { Injectable } from '@angular/core';
import { ContributorService } from '../contributor/contributor.service';
import { SQLiteService } from '../sqlite/sqlite.service';
import PerfliteDataSource from '../datasource';

@Injectable({
  providedIn: 'root'
})
export class OrmService {
  isOrmService: Boolean = false;

  constructor(
    private sqliteService: SQLiteService,
    private contributorService: ContributorService
  ) { };

  // Private functions
  /**
   * Initialize the TypeOrm Service
   */
  async initialize(): Promise<void> {
    try {
      // Check connections consistency
      await this.sqliteService.checkConnectionConsistency();

      // Loop through your DataSources
      for (const dataSource of [/*UserDataSource,*/ PerfliteDataSource]) {
        const database = String(dataSource.options.database);

        if (!dataSource.isInitialized) {
          // console.log('before dataSource.initialize()');

          // console.log(dataSource);

          // initialize DataSource
          await dataSource.initialize();

          // console.log(`*** dataSource has been initialized ***`)

          // run the migrations
          await dataSource.runMigrations();

          // console.log(`*** dataSource runMigration has been run succesfully ***`)

          // load data for this datasource
          // if (database.includes('contributor')) {
          this.contributorService.database = database;
          this.contributorService.dataSource = dataSource;

          await this.contributorService.initialize();

          // console.log(`*** contributorService has been initialized ***`)
          // }
          if (this.sqliteService.getPlatform() === 'web') {
            // save the databases from memory to store
            await this.sqliteService.getSqliteConnection().saveToStore(database);
            // console.log(`*** inORMService saveToStore ***`)
          }
        }

        // console.log(`DataSource: ${database} initialized`);
      }

      this.isOrmService = true;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}


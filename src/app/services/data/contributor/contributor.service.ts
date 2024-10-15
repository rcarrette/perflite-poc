import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contributor } from 'src/app/models/entities/contributor';
import { DataSource, Repository } from 'typeorm';

const MOCK_CONTRIBUTORS: Contributor[] = [
  { id: 1, firstname: "Sam", lastname: "Somasegar" },
  { id: 2, firstname: "John", lastname: "Doe" },
  { id: 3, firstname: "Mickael", lastname: "Schwartz" }
];

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  public dataSource!: DataSource;
  public database!: string;

  public contributors: BehaviorSubject<Contributor[]> = new BehaviorSubject<Contributor[]>([]);

  private contributorsRepository!: Repository<Contributor>

  private areContributorsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  async initialize(): Promise<void> {
    if (this.dataSource.isInitialized) {
      this.contributorsRepository = this.dataSource.getRepository(Contributor);

      let contributorsCount: number = await this.contributorsRepository.count();

      if (contributorsCount === 0) {
        // create contributors if they don't already exist
        for (const contributor of MOCK_CONTRIBUTORS) {
          try {
            let existingContributor = await this.contributorsRepository.findOneBy({ id: contributor.id });

            if (!existingContributor) {
              let newContributor = new Contributor();

              newContributor.id = contributor.id;
              newContributor.firstname = contributor.firstname;
              newContributor.lastname = contributor.lastname;

              await this.create(newContributor);
            }

            this.getAll().then(() => {
              this.areContributorsReady.next(true);
            });
          } catch (err: any) {
            const msg = err.message ? err.message : err;

            return Promise.reject(`Error creating contributor: ${msg}`);
          }
        }
      }
    }
    else {
      return Promise.reject(`Error: DataSource not initialized`)
    }
  }

  async create(contributor: Contributor) {
    await this.contributorsRepository.save(contributor);
  }

  async getAll(): Promise<void> {
    try {
      const contributors: [Contributor] = await this.contributorsRepository.query("select * from contributor");

      this.contributors.next(contributors);
    } catch (err: any) {
      const msg = err.message ? err.message : err;

      return Promise.reject(`Error getAll: ${msg}`);
    }
  }

  getContributors(): Observable<Contributor[]> {
    return this.contributors.asObservable();
  }

  getState() {
    return this.areContributorsReady.asObservable();
  }
}

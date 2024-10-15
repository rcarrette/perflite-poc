import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contributor } from 'src/app/models/entities/contributor';
import { ContributorService } from 'src/app/services/data/contributor/contributor.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss'],
})
export class ContributorsComponent implements OnInit {
  public contributors: Contributor[] = [];

  constructor(private contributorService: ContributorService) { }

  ngOnInit() {
    try {
      this.contributorService.getState().subscribe(res => {
        console.log(res);

        if (res) {
          this.contributorService.getContributors().subscribe(data => {
            this.contributors = data;

            console.log(this.contributors);
          });
        }
      });
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

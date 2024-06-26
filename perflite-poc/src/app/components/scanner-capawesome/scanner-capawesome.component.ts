import { Component, OnInit } from '@angular/core';
import { NfcTag } from '@capawesome-team/capacitor-nfc';
import { ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { NfcService } from 'src/app/services/nfc/nfc.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlatformService } from 'src/app/services/platform/platform.service';

@Component({
  selector: 'app-scanner-capawesome',
  templateUrl: './scanner-capawesome.component.html',
  styleUrls: ['./scanner-capawesome.component.scss'],
})
export class ScannerCapawesomeComponent implements ViewDidEnter, ViewWillLeave {
  public scannedTag$: Observable<NfcTag>;

  private showLastScannedTag = false;

  constructor(
    private readonly nfcService: NfcService,
    private readonly platformService: PlatformService,
  ) {
    this.showLastScannedTag = true;
    this.scannedTag$ = this.showLastScannedTag
      ? this.nfcService.lastScannedTag$
      : this.nfcService.scannedTag$;
  }

  public ionViewDidEnter(): void {
    this.nfcService.startScanSession();
    this.subscribeToObservables();
  }

  public ionViewWillLeave(): void {
    this.nfcService.stopScanSession();
  }

  private subscribeToObservables(): void {
    if (this.platformService.isIos()) {
      this.scannedTag$
        .pipe(take(1), untilDestroyed(this))
        .subscribe(() => this.nfcService.stopScanSession());
    }
  }
}

import { Injectable, NgZone } from '@angular/core';
import {
  Nfc,
  NfcTag,
  PollingOption,
  TransceiveOptions,
  TransceiveResult,
  WriteOptions,
} from '@capawesome-team/capacitor-nfc';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class CapacitorNfcService {
  private readonly scannedTagSubject = new Subject<NfcTag>();
  private readonly lastScannedTagSubject = new ReplaySubject<NfcTag>(1);
  private readonly sessionCanceledSubject = new Subject<void>();
  private readonly sessionErrorSubject = new Subject<string>();

  constructor(
    private readonly ngZone: NgZone,
    private readonly platformService: PlatformService,
  ) {
    Nfc.removeAllListeners().then(() => {
      Nfc.addListener('nfcTagScanned', event => {
        this.ngZone.run(() => {
          this.scannedTagSubject.next(event.nfcTag);
          this.lastScannedTagSubject.next(event.nfcTag);
        });
      });
      Nfc.addListener('scanSessionCanceled', () => {
        this.ngZone.run(() => {
          this.sessionCanceledSubject.next();
        });
      });
      Nfc.addListener('scanSessionError', event => {
        this.ngZone.run(() => {
          this.sessionErrorSubject.next(event.message);
        });
      });
    });
  }

  public get scannedTag$(): Observable<NfcTag> {
    return this.scannedTagSubject.asObservable();
  }

  public get lastScannedTag$(): Observable<NfcTag> {
    return this.lastScannedTagSubject.asObservable();
  }

  public get sessionCanceled$(): Observable<void> {
    return this.sessionCanceledSubject.asObservable();
  }

  public get sessionError$(): Observable<string> {
    return this.sessionErrorSubject.asObservable();
  }

  public async startScanSession(): Promise<void> {
    await Nfc.startScanSession({
      pollingOptions: [PollingOption.iso14443, PollingOption.iso15693],
    });
  }

  public async stopScanSession(): Promise<void> {
    await Nfc.stopScanSession();
  }

  public async write(options: WriteOptions): Promise<void> {
    await Nfc.write(options);
  }

  public async erase(): Promise<void> {
    await Nfc.erase();
  }

  public async format(): Promise<void> {
    await Nfc.format();
  }

  public transceive(options: TransceiveOptions): Promise<TransceiveResult> {
    return Nfc.transceive(options);
  }

  public async openSettings(): Promise<void> {
    await Nfc.openSettings();
  }

  public async isSupported(): Promise<boolean> {
    return true;
    // const { isSupported } = await Nfc.isSupported();
    // return isSupported;
  }

  public async isEnabled(): Promise<boolean> {
    if (!this.platformService.isAndroid()) {
      return true;
    }
    const { isEnabled } = await Nfc.isEnabled();
    return isEnabled;
  }
}
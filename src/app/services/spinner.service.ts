import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  busyReqCount = 0;
  private spinnerService = inject(NgxSpinnerService);

  busy() {
    this.busyReqCount++;
    this.spinnerService.show(undefined, {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(0, 0, 0, 1)",
      color: "white",
    });
  }

  idle() {
    this.busyReqCount--;
    if (this.busyReqCount <=0 ) {
      this.busyReqCount = 0;
      this.spinnerService.hide();
    }
  }
}

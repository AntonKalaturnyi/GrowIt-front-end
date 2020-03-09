import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  timeoutError(message, title, time) {
    this.toastr.error(message, title , {
      timeOut :  time,
      disableTimeOut: false
    });
  }
}

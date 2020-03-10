import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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


  errorMessage(message, title) {
    this.toastr.error(message, title, {
      enableHtml :  true
    });
  }


  successMessage(message, title) {
    this.toastr.success(message, title, {
      enableHtml :  true
    });
  }

}

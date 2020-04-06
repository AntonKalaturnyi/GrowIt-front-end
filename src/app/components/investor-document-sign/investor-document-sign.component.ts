import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { InvestService } from 'src/app/services/invest.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investor-document-sign',
  templateUrl: './investor-document-sign.component.html',
  styleUrls: ['./investor-document-sign.component.scss']
})
export class InvestorDocumentSignComponent implements OnInit {

  constructor(public permissionService: PermissionService, private investService: InvestService, 
    private alertService: AlertService, private router: Router) { }

 public static investments;
  static amount = 0;
  static profit = 0;
  policy = false;
  contract = false;

  ngOnInit(): void {
  }

  get amount(): any {
    return InvestorDocumentSignComponent.amount;
  }

  get profit(): any {
    return InvestorDocumentSignComponent.profit;
  }
  sendInvestments() {
    this.investService.submitInvestments(InvestorDocumentSignComponent.investments).subscribe(data => {
      this.alertService.successMessage('Інвестицію(ї) оформлено!', 'Супер');
      // this.router.navigateByUrl('new-borrower');
      InvestorDocumentSignComponent.amount = null;
      InvestorDocumentSignComponent.profit = null;
      InvestorDocumentSignComponent.investments = null;
      this.router.navigateByUrl('dashboard');

    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Помилка!');
    });
  }

}

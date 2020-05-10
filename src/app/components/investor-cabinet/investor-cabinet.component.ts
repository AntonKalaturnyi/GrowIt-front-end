import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { InvestorCabinetService } from 'src/app/services/investor-cabinet.service';


@Component({
  selector: 'app-investor-cabinet',
  templateUrl: './investor-cabinet.component.html',
  styleUrls: ['./investor-cabinet.component.scss']
})
export class InvestorCabinetComponent implements OnInit {

  constructor(public permissionService: PermissionService, public cabinetService: InvestorCabinetService) { }

  availableBalance: number;
  investedFunds: number;

  ngOnInit(): void {
    this.cabinetService.getData().subscribe(data => {
      this.availableBalance = data.availableBalance;
      this.investedFunds = data.investedFunds;

    });
  }

}

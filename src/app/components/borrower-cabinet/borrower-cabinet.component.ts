import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { BorrowerCabinetService } from 'src/app/services/borrower-cabinet.service';

@Component({
  selector: 'app-borrower-cabinet',
  templateUrl: './borrower-cabinet.component.html',
  styleUrls: ['./borrower-cabinet.component.scss']
})
export class BorrowerCabinetComponent implements OnInit {

  constructor(public permissionService: PermissionService, private cabinetService: BorrowerCabinetService) { }

  availableBalance: number;
  dailyRate: number;
  rank: string;
  score: string;
  status: string;

  ngOnInit(): void {
    this.cabinetService.getData().subscribe(data => {
      this.availableBalance = data.availableBalance;
      this.dailyRate = data.dailyRate;
      this.rank = data.rank;
      this.score = data.score;
      this.status = data.status;
    });
  }

}

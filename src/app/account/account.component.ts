import { Component } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(public _contractService: ContractService) {
    this._contractService.enableDapp();
    this._contractService.listenToEvents();
  }
}

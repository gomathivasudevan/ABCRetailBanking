import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Payee } from '../payee.model';
import * as fromApp from '../../store/app.reducer';
import { EmailValidator, NgForm } from '@angular/forms';
import * as UpdateAccountAction from "./store/update-account.action";
import { UserData } from '../userdata.model';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  @Output() updateAccountFormSubmitted= new EventEmitter<boolean>();
  @ViewChild('f') fundTransferform: NgForm;
  @ViewChild('personalDetailsForm') personalDetailsForm: NgForm;
  @ViewChild('updateAccountBalanceForm') updateAccountBalanceForm: NgForm;
  @Input() isAdminLoggedIn: boolean;
  @Input() accountBalance: number;
  @Input() accountNo: string;

  showFundTransferDiv: boolean;
  showUpdatePersonalDetailsDiv: boolean;
  showUpdateAccountBalanceDiv: boolean;

  ispayeeSelected = false;
  amountToTransfer:number;
  payeeOldBalance: number;
  balAmoFromUpAccBalDiv: number;
  selectedAccountNo: string= '';
  phone:number=0;
  emailid:string='';
  loggedInuserObj: UserData = null;

  payeeArray: Payee[]=[];
  ngOnInit(): void {
    console.log('Admin: ' + this.isAdminLoggedIn);
    this.store.select('accountBalance').subscribe(resData => {
      this.loggedInuserObj = resData.userDetail.find(x=> x.accountno === this.accountNo);
      this.phone = this.loggedInuserObj.phone;
      this.emailid = this.loggedInuserObj.email;
    })
  }

  onSelectPayee() {
    this.store.select('updateaccount').subscribe(result => {
      this.payeeArray = result.payeeList;
    })
  }

  onSelectedPayee(name: string, accountNo: string) {
    this.selectedAccountNo= accountNo;
    this.ispayeeSelected = true;
    //Get payee details to update the balance
    this.store.dispatch(new UpdateAccountAction.GetSelectedPayeeDetails(this.selectedAccountNo));
  }

  onSubmitFundTransfer() {
    console.log(this.fundTransferform.value);
    this.updateAccountFormSubmitted.emit(true);

    //Update Payee
    //need to check with Ranju, whether we can do this in reducer file using arithmetic operation
    this.store.select('updateaccount').subscribe(resData => {
      this.payeeOldBalance = resData.payeeAccountBalance;
    })
    //
    this.store.dispatch(new UpdateAccountAction.UpdatePayeeBalance(this.amountToTransfer + this.payeeOldBalance, this.selectedAccountNo));

    //Update user
    this.store.dispatch(new UpdateAccountAction.UpdateUserBalance(this.accountBalance - this.amountToTransfer, this.accountNo));
    
  }

  onSubmitPersonalDetails() {
    this.updateAccountFormSubmitted.emit(true);
    this.store.dispatch(new UpdateAccountAction.UpdatePersonalDetail(this.phone, this.accountNo));
  }

  onSubmitAccountBalance() {
    this.updateAccountFormSubmitted.emit(true);
    this.store.dispatch(new UpdateAccountAction.UpdateUserBalance(this.balAmoFromUpAccBalDiv, this.accountNo));
  }

  onFundTransferBtnClik() {
    this.showFundTransferDiv = true;
  }
  onUpdatepersonalDetailsBtnClik() {
    this.showUpdatePersonalDetailsDiv = true;
  }
  onUpdateAccountBalanceBtnClik() {
    this.showUpdateAccountBalanceDiv = true;
  }
  onCancelFundTransfer() {
    this.showFundTransferDiv = false;
  }
  onCancelPersonalDetaisUpdate() {
    this.showUpdatePersonalDetailsDiv = false;
  }
  onCancelAccountBalanceUpdate() {
    this.showUpdateAccountBalanceDiv = false;
  }
  onBackClick() {
    this.updateAccountFormSubmitted.emit(true);
  }
}

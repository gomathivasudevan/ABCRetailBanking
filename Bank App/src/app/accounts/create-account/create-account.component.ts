import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountOperationsService } from '../accountoperation.service';
import { Customer } from '../add-user/add-user.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Branch } from '../branch.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  @Output() createAccountFormSubmitted = new EventEmitter<boolean>();

  constructor(
    private accountservice: AccountOperationsService,
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>) { }

  accountCreationForm: FormGroup;
  isSubmitted = false;

  fullNameVal = '';
  emailVal = '';
  phoneVal = '';
  branchnameVal = '';
  initialbalanceVal = '';
  customerIdVal = '';
  accounttypeVal = '';
  primaryaccountownerVal = '';

  displayPopup: boolean;
  filteredCustomerResult = '';
  customerArray: Customer[] = [];
  branchArray: Branch[] = [];

  ngOnInit(): void {
    this.accountCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branchname: ['', Validators.required],
      initialbalance: ['', Validators.required],
      customerid: ['', Validators.required],
      primaryaccountowner: ['', ''],
      accounttype: ['', '']
    });
    this.branchnameVal = 'Select Branch';
    this.accounttypeVal = 'Account Type';

    // Fetch Users List from firebase
    this.accountservice.fetchUsersList().subscribe(responseData => {
      console.log(responseData);
      this.customerArray = responseData;
    })

    //Fetch Branch List from Store
    this.store.select('createAccount')
      .subscribe(reducer => {
        this.branchArray = reducer.branchList;
      });
  }
  get formControls() { return this.accountCreationForm.controls; }

  createAccount() {
    console.log(this.accountCreationForm.value);
    this.isSubmitted = true;
    if (this.accountCreationForm.invalid) {
      return;
    } else {
      this.accountservice.createUserAccount(this.accountCreationForm.value).subscribe(responseData => {
        console.log(responseData);
        this.createAccountFormSubmitted.emit(true);
      });
      this.accountCreationForm.reset();
    }
  }

  onCancel() {
    this.accountCreationForm.reset();
    this.createAccountFormSubmitted.emit(true);
  }

    onLinkCustomer() {
    this.displayPopup = true;
  }

  onSelectCustomer(customerId: string, customerName: string) {
    this.customerIdVal = customerId;
    this.primaryaccountownerVal = customerName;

    this.displayPopup = false
  }
}

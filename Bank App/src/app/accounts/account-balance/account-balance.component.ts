import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountOperationsService } from '../accountoperation.service';
import * as fromApp from '../../store/app.reducer';
import { UserData } from '../userdata.model';
import * as AccountBalanceAction from "./store/account-balance.action";

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit, AfterViewInit {
  isAdminLoggedIn = false;
  loadCreateAccountComponent = false;
  loadUpdateAccountComponent = false;
  loadAdduserComponent = false;
  loadSearchUserComponent = false;
  loggedinUserEmailId = '';
  adminUserID = "2Sjy7Suh4ORH566Q8ZMjvuFIwQG2";
  activeUserObj: UserData = null;
  currentDate = new Date();

  constructor(private accountService: AccountOperationsService, private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngAfterViewInit(): void {

    if(!this.isAdminLoggedIn) {
      this.store.select('accountBalance').subscribe(result => {
        this.activeUserObj = result.userDetail.find(x => x.email === this.loggedinUserEmailId);
        console.log(this.activeUserObj);
      })
  }
  }

  ngOnInit(): void {
    this.authService.user.subscribe(userObj => {
      if (userObj.id === this.adminUserID) {
        this.isAdminLoggedIn = true;
        console.log('Admin: ' + this.isAdminLoggedIn);
      }
      this.loggedinUserEmailId = userObj.email;
    });
    this.store.dispatch(new AccountBalanceAction.GetUserData());
  }

  // ---------------***************---------------

  onAddUser() {
    this.loadAdduserComponent = true;
  }

  onCreateAccount() {
    this.loadCreateAccountComponent = true;
  }

  onUpdateAccount() {
    this.loadUpdateAccountComponent = true;
  }

  onSearchUser() {
    this.loadSearchUserComponent = true;
  }

  // ---------------****************-----------

  onAddUserFormSubmitted() {
    this.loadAdduserComponent = false;
  }

  onCreteAccountFormSubmitted() {
    this.loadCreateAccountComponent = false;
  }

  onUpdateAccountFormSubmitted() {
    this.loadUpdateAccountComponent = false;
    this.store.select('updateaccount').subscribe(resData => {
      this.activeUserObj.initialbalance = resData.userAccountBalance;
    })
  }

  onSearchUserFormSubmited(selectedUser) {
    this.loadSearchUserComponent = false;
    this.activeUserObj = selectedUser;
  }
}

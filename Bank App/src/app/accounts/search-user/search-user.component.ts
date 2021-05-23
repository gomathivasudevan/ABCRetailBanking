import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as Action from '../account-balance/store/account-balance.action';
import { UserData } from '../userdata.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  //@ViewChild('searchUserForm') searchUserForm: NgForm;
  @Output() SearchUserFormSubmited = new EventEmitter<UserData>();

  searchkey: string= '';
  searchOption: string= 'Search by options';

  customersArray: UserData[]= [];
  filteredResultArray: UserData[]= [];
  displaySearchResult:boolean;

  ngOnInit(): void {
    this.store.dispatch(new Action.GetUserData());
  }

  onSearch() {
    this.store.select('accountBalance').subscribe( result => {
      this.customersArray = result.userDetail;
    })
    switch(this.searchOption) {
      case 'Account Name':
        {
           this.customersArray.filter(x=> x.name.toLowerCase().includes(this.searchkey))
           .forEach((value,index) => {
              this.filteredResultArray.push(value);
           })
           break;
        }
      case 'Account Number':
        {
          this.filteredResultArray.push(this.customersArray.find(x=>x.accountno === this.searchkey));
          break;
        }
      case 'Client Name':
        {
          break;
        }
      default:
        break;
    }
    this.displaySearchResult = true;
  }

  onCancel() {
    this.SearchUserFormSubmited.emit(null);
  }

  onSelectCustomer(selectedUser: UserData){
    this.SearchUserFormSubmited.emit(selectedUser);
  }
}

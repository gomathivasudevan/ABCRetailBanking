import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'courseproject';

  mainList: Array<any> = [
    {
      title: 'Account Balance',
    },
    {
      title: 'Create Account',
      link: '/account/createaccount'
    },
    {
      title: 'Update Account',
      link: '/account/updateaccount'
    },
    {
      title: 'Transaction Details',
    }
    , {
      title: 'Feeds',
    },
    {
      title: 'Add User',
      link: '/account/adduser'
    },
  ];;
  headeritems = [
    { title: 'Logout', action: 'logout()' },

  ];
  constructor(
    private sidebarService: NbSidebarService, 
    private nbMenuService: NbMenuService, 
    public router: Router,
    private authService: AuthService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}

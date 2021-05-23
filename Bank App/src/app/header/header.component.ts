import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

//need to pass javascript object to this component to configure this component
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']

}
)
export class HeaderComponent  implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSubscription: Subscription
    constructor(private authservice: AuthService) {

    }
    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
    ngOnInit(): void {
        this.userSubscription = this.authservice.user.subscribe( user => {
            this.isAuthenticated = !!user;
        });
    }
    onFetchListOfUsers() {

    }
    onLogout() {
        this.authservice.logout();
    }
}
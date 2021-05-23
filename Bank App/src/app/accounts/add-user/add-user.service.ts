import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/user.model";

@Injectable({providedIn: 'root'})
export class AdduserService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    adduser(userInfo: User){
        return this.authService.user.pipe(take(1), exhaustMap( userData => {
            return this.http.post(
                'https://db-for-bankapp-default-rtdb.firebaseio.com/users.json',
                userInfo,
                {
                    params: new HttpParams().set('auth',userData.token)
                }
            )
        })).subscribe( resData => {
            console.log(resData);
        })
    };
}
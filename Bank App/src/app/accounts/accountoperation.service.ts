import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Customer } from "./add-user/add-user.model";
import { UserData } from "./userdata.model";

@Injectable({providedIn: 'root'})
export class AccountOperationsService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    createUserAccount(data: UserData) {
        // return this.authService.user.pipe(take(1), exhaustMap( userData => {
            return this.http.post(
            'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation.json',
            data
            // {
            //     params: new HttpParams().set('auth', userData.token)
            // }
            )
        // }));
    }

    fetchUsersDetails(){
        // return this.authService.user.pipe(take(1), exhaustMap( userData => {
            return this.http.get(
                'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation/-Ma6xJS_tObtGza157vR.json'
                // {
                //     params: new HttpParams().set('auth',userData.token)
                // }
            )
        // }));
        
    }

    fetchUsersList(){
        // return this.authService.user.pipe(take(1), exhaustMap( userdata => {
            return this.http.get('https://db-for-bankapp-default-rtdb.firebaseio.com/users.json')
            // {
            //     params: new HttpParams().set('auth', userdata.token)
            // })
        // }))
        .pipe(
            map(resData => {
                const resultArray: Customer[] = [];
                for(const key in resData){
                    if(resData.hasOwnProperty(key)) {
                        resultArray.push({...resData[key], id: key });
                    }
                }
                return resultArray;
            }
            )
        )
    }
}
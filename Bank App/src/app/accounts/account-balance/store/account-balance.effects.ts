import { HttpClient, HttpParams } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as AccountBalanceAction from "./account-balance.action"; 
import * as fromApp from '../../../store/app.reducer';
import { exhaustMap, map, switchMap, take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { UserData } from "../../userdata.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AccountBalanceEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private authService: AuthService
      ) {}
      
    @Effect()
    fetchUserData = this.actions$.pipe(
        ofType(AccountBalanceAction.GET_USER_DATA),
        switchMap(() => {
            // return this.authService.user.pipe(take(1), exhaustMap( userData => {
                return this.http.get(
                    'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation.json'
                    // {
                    //     params: new HttpParams().set('auth',userData.token)
                    // }
                );
            // }));
        }),
        map(responseData => {
            const resultArray: UserData[] = [];
            for(const key in responseData){
                // ... is an operator to form a new object. This operator will work with key value pair
                if(responseData.hasOwnProperty(key)){
                    resultArray.push({...responseData[key], accountno: key });
                }
              }
              return resultArray;
        }),
        map(userDetails => {
            return new AccountBalanceAction.SetUserData(userDetails);
        })
    );
}
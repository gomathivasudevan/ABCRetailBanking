import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { exhaustMap, map, switchMap, take, withLatestFrom } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import * as UpdateAccountAction from './update-account.action';
import * as fromApp from '../../../store/app.reducer';
import { Store } from "@ngrx/store";
import { UserData } from "../../userdata.model";

@Injectable()
export class UpdateAccountEffects {
    
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private authService: AuthService) {}

    @Effect({dispatch: false})
    updatePayeeBalance = this.actions$.pipe(
        ofType(UpdateAccountAction.UPDATE_PAYEE_BALANCE),
        withLatestFrom(this.store.select('updateaccount')),
        switchMap(([actionData, dataState]) => {
            // return this.authService.user.pipe(take(1), exhaustMap( userData => {
                return this.http.patch(
                    'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation/' + dataState.selectedAccountNo + '.json',
                    {
                        initialbalance: dataState.payeeAccountBalance
                    }
                    // {
                    //     params: new HttpParams().set('auth',userData.token)
                    // }
                );
            // }));
        })
    );

    @Effect({dispatch: false})
    updatePersonalDetail = this.actions$.pipe(
        ofType(UpdateAccountAction.UPDATE_PERSONAL_DETAIL),
        withLatestFrom(this.store.select('updateaccount')),
        switchMap(([actionData, dataState]) => {
            // return this.authService.user.pipe(take(1), exhaustMap( userData => {
                return this.http.patch(
                    'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation/' + dataState.userAccountNo + '.json',
                    {
                        phone: dataState.userPhoneno
                    }
                    // {
                    //     params: new HttpParams().set('auth',userData.token)
                    // }
                );
            // }));
        })
    );

    @Effect({dispatch: false})
    updateUserBalance = this.actions$.pipe(
        ofType(UpdateAccountAction.UPDATE_USER_BALANCE),
        withLatestFrom(this.store.select('updateaccount')),
        switchMap(([actionData, dataState]) => {
            // return this.authService.user.pipe(take(1), exhaustMap( userData => {
                return this.http.patch(
                    'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation/' + dataState.userAccountNo + '.json',
                    {
                        initialbalance: dataState.userAccountBalance
                    }
                    // {
                    //     params: new HttpParams().set('auth',userData.token)
                    // }
                );
            // }));
        })
    );

    @Effect()
    getSelectedPayeeDetails = this.actions$.pipe(
        ofType(UpdateAccountAction.GET_SELECTED_PAYEE_DETAILS),
        withLatestFrom(this.store.select('updateaccount')),
        switchMap(([actionData, dataState]) => {
            // return this.authService.user.pipe(take(1), exhaustMap( userData => {
                return this.http.get<UserData>(
                    'https://db-for-bankapp-default-rtdb.firebaseio.com/accountoperation/' + dataState.selectedAccountNo + '.json'
                    // {
                    //     params: new HttpParams().set('auth',userData.token)
                    // }
                );
            // }));
        }),
        map(resData => {
            return new UpdateAccountAction.SetSelectedPayeeOldBalance(resData.initialbalance);
        })
    );
}
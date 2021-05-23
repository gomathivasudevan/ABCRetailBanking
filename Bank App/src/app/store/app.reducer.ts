import { ActionReducerMap } from '@ngrx/store'
import * as fromCreateAccount from 'src/app/accounts/create-account/store/create-account.reducer'
import * as fromUpdateAccount from '../accounts/update-account/store/update-account.reducer'
import * as fromAccountBalance from '../accounts/account-balance/store/account-balance.reducer'

export interface AppState {
    createAccount: fromCreateAccount.State,
    updateaccount: fromUpdateAccount.State,
    accountBalance: fromAccountBalance.State
}

export const appReducer: ActionReducerMap<AppState> = {
    createAccount: fromCreateAccount.CreateAccountReducer,
    updateaccount: fromUpdateAccount.UpdateAccountReducer,
    accountBalance: fromAccountBalance.AccountBalanceReducer
};
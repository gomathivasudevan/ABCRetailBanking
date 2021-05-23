import { Action } from "@ngrx/store";

export const GET_PAYEE_LIST = '[Update Account] Get Payee List';
export const UPDATE_PAYEE_BALANCE = '[Update Account] Update Payee balance';
export const UPDATE_USER_BALANCE = '[Update Account] Update User balance';
export const GET_SELECTED_PAYEE_DETAILS = '[Update Account] Get Selected Payee Details';
export const SET_SELECTED_PAYEE_OLD_BALANCE = '[Update Account] Set Selected Payee Old Balance';
export const UPDATE_PERSONAL_DETAIL = '[Update Account] Update Personal Details';

export class GetPayeeList implements Action {
   readonly type = GET_PAYEE_LIST;
}

export class UpdatePayeeBalance implements Action {
   readonly type = UPDATE_PAYEE_BALANCE;

   constructor(public amount: number, public selectedAccountNo: string) {}
}

export class UpdateUserBalance implements Action {
   readonly type = UPDATE_USER_BALANCE;

   constructor(public amount: number, public accountNo: string) {}
}

export class UpdatePersonalDetail implements Action {
   readonly type = UPDATE_PERSONAL_DETAIL;

   constructor(public phone: number, public accountNo: string) {}
}

export class GetSelectedPayeeDetails implements Action {
   readonly type = GET_SELECTED_PAYEE_DETAILS;

   constructor(public accountNo: string) {}
}

export class SetSelectedPayeeOldBalance implements Action {
   readonly type = SET_SELECTED_PAYEE_OLD_BALANCE;

   constructor(public payeeOldbalance: number) {}
}

export type UpdateAccountActions = 
GetPayeeList | 
UpdatePayeeBalance |
UpdateUserBalance |
UpdatePersonalDetail |
GetSelectedPayeeDetails |
SetSelectedPayeeOldBalance;
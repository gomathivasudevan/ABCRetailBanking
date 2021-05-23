import { Action } from "@ngrx/store";

export const GET_BRANCH_LIST = '[Create Account] Get Branch List';
export const GET_CUSTOMER_LIST = '[Create Account] Get Customer List';

export class GetBranchList implements Action {
    readonly type = GET_BRANCH_LIST;
}

export class GetCustomerList implements Action {
    readonly type = GET_CUSTOMER_LIST;
}

export type CreateAccountActions = 
GetBranchList | 
GetCustomerList;
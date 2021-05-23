import { Payee } from "../../payee.model";
import * as UpdateAccountAction from './update-account.action';

export interface State {
    payeeList: Payee[];
    payeeAccountBalance: number;
    userAccountBalance: number;
    selectedAccountNo: string;
    userAccountNo: string;
    userPhoneno: number;
}

const initialState: State= {
    payeeList: [new Payee('Gokulan T', '-Ma6wzsx53nzNQG6AB8f'),
                new Payee('Sarasvathi V','-Ma6xJS_tObtGza157vR')],
    payeeAccountBalance: 0,
    userAccountBalance: 0,
    selectedAccountNo: '',
    userAccountNo: '',
    userPhoneno:0
};

export function UpdateAccountReducer(
    state: State = initialState,
    action:UpdateAccountAction.UpdateAccountActions
){
    switch(action.type){
        case UpdateAccountAction.GET_PAYEE_LIST:
            return{
                ...state,
            };
        case UpdateAccountAction.UPDATE_PAYEE_BALANCE:
            return{
                ...state,
                payeeAccountBalance: action.amount,
                selectedAccountNo: action.selectedAccountNo
            };
        case UpdateAccountAction.UPDATE_USER_BALANCE:
        return{
            ...state,
            userAccountBalance: action.amount,
            userAccountNo: action.accountNo
        };
        case UpdateAccountAction.UPDATE_PERSONAL_DETAIL:
        return{
            ...state,
            userPhoneno: action.phone,
            userAccountNo: action.accountNo
        };
        case UpdateAccountAction.GET_SELECTED_PAYEE_DETAILS:
            return{
                ...state,
                selectedAccountNo: action.accountNo
            };
        case UpdateAccountAction.SET_SELECTED_PAYEE_OLD_BALANCE:
            return{
                ...state,
                payeeAccountBalance: action.payeeOldbalance
            };
        default:
            return state;
    }
}
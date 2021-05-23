import { UserData } from "../../userdata.model";
import * as Actions from "./account-balance.action";

export interface State {
    userDetail: UserData[];
}

export const initialState: State =  {
    userDetail: []
};

export function AccountBalanceReducer (
    state: State = initialState,
    action:Actions.AccountBalanceActions) {
    switch (action.type) {
        case Actions.SET_USER_DATA:
            return {
                ...state,
                userDetail: [...action.payload]
            };
        case Actions.GET_USER_DATA:
            return {
                ...state
            };
        default:
            return state;
    }
}
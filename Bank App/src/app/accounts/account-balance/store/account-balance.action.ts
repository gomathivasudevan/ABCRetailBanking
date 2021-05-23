import { Action } from "@ngrx/store";
import { UserData } from "../../userdata.model";

export const GET_USER_DATA = '[Account Balance]Get User Data';
export const SET_USER_DATA = '[Account Balance]Set_User_Data';

export class SetUserData implements Action {
    readonly type = SET_USER_DATA;
    
    constructor(public payload: UserData[]) {}
}
export class GetUserData implements Action {
    readonly type = GET_USER_DATA;
}

export type AccountBalanceActions = SetUserData | GetUserData;
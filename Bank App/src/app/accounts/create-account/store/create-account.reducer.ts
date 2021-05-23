import { Branch } from "../../branch.model";
import * as CreateAccountActions from './create-account.action'

export interface State {
    branchList: Branch[];
}

const initialState: State = {
    branchList: [new Branch('Velachery', 'ABC000001'),
                 new Branch('Adyar', 'ABC000002'),
                 new Branch('Porur', 'ABC000003'),
                 new Branch('T nagar', 'ABC000004'),
                 new Branch('Nungampakkam', 'ABC000005'),
                 new Branch('Nanganallur', 'ABC000006')
                ]
};

export function CreateAccountReducer (
    state: State = initialState,
    action: CreateAccountActions.CreateAccountActions
) {
    switch(action.type) {
        case CreateAccountActions.GET_BRANCH_LIST: 
            return {
                ...state,
            };
        default:
            return state;
    }
}
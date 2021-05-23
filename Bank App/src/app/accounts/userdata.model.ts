export class UserData {

    constructor(
        public name: string, 
        public email: string,
        public phone: number,
        public branchname: string,
        public accounttype: string,
        public initialbalance: number,
        public customerid: number,
        public primaryaccountowner: string,
        public accountno?: string
        ) {}
}
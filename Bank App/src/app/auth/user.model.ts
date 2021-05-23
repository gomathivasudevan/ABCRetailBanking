export class User {
    constructor(
        public email: string,
        public id: string,
        public accountbalance: number,
        public accountno: number,
        public name: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null; //Token which we have is not valid. So, returning null
        }
        return this._token;
    }
}
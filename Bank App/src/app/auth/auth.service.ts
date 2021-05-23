import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirtionTimer: any;    

    token: string = null;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuDlreJ2IzbeGkd0Wv1EEwNIS5XNE5TTk',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn);
        }));
        
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuDlreJ2IzbeGkd0Wv1EEwNIS5XNE5TTk',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn);
        }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirtionTimer) {
            clearTimeout(this.tokenExpirtionTimer);
        }
        this.tokenExpirtionTimer = null;
    }

    autoLogin() {
        const userData:{
            email: string;
            id: string;
            accountbalance: number;
            accountno: number;
            name: string;
            _token: string;
            _tokenExpirationDate: Date;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }
        const loadeduser = new User(
            userData.email, 
            userData.id, 
            userData.accountbalance, 
            userData.accountno, 
            userData.name,
            userData._token,
            new Date(userData._tokenExpirationDate));

        if(loadeduser.token) {  //getter will be called here
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadeduser);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirtionTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Unknown error occured!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS': 
              errorMessage = 'This email exist already.';
              break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not eist.'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.'
                break;
        }
        return throwError(errorMessage);
    }

    //This method will create a user object for logged in user
    private handleAuthentication (email: string, userId: string, token: string, expiresIn: number){
        const expirationdate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userId, 
            100,
            111,
            'Gomathi',
            token,
            expirationdate  
            );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
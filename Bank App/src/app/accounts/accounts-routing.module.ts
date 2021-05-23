import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AccountBalanceComponent } from "./account-balance/account-balance.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { SearchUserComponent } from "./search-user/search-user.component";
import { UpdateAccountComponent } from "./update-account/update-account.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'accountbalance',
        pathMatch: 'full'
    },
    {
        path: 'accountbalance',
        canActivate:[AuthGuard],
        component: AccountBalanceComponent,
        children: [
            {
                path: 'createaccount',
                component: CreateAccountComponent
            },
            {
                path: 'adduser',
                component: AddUserComponent
            },
            {
                path: 'updateaccount',
                component: UpdateAccountComponent
            },
            {
                path: 'searchuser',
                component: SearchUserComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {}
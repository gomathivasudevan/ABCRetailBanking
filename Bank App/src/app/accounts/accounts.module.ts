import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from "../shared/filter.pipe";
import { AccountBalanceComponent } from "./account-balance/account-balance.component";
import { AccountRoutingModule } from "./accounts-routing.module";
import { AddUserComponent } from "./add-user/add-user.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { UpdateAccountComponent } from './update-account/update-account.component';
import { SearchUserComponent } from './search-user/search-user.component';

@NgModule({
    declarations: [
        AccountBalanceComponent,
        CreateAccountComponent,
        AddUserComponent,
        FilterPipe,
        UpdateAccountComponent,
        SearchUserComponent
    ],
    imports: [
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
    ]
})

export class AccountModule {}
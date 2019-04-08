import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MatchesComponent} from "./matches/matches.component";
import {UserComponent} from "./user/user.component";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthService} from "./services/auth.service";
import {LoginComponent} from "./login/login.component";
import {UniqueEmailDirective} from "./unique-email.directive";
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    UniqueEmailDirective,
    NotFoundComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}

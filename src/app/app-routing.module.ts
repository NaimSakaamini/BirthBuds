import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {MatchesComponent} from "./matches/matches.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "matches/:email", component: MatchesComponent},
  {path: "user/:id", component: UserComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "not-found/:type/:content", component: NotFoundComponent},
  {path: "", pathMatch: "full", redirectTo: "/login"},
  {path: "**", redirectTo: "/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

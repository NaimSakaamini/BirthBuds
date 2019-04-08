import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../classes/user";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private userService: UserService, private router: Router) {}

  public login(email: string, password: string): void {
    this.userService.getUser(email);
    // this.auth0.authorize();
  }

  public getUserInfo() {
    // return new Promise((resolve, reject) => {
    //   console.log(this.auth0);
    //   this.auth0.parseHash({hash: window.location.hash}, (error, authResult) => {
    //     if (error) console.log("there was an error parsing the hash...");
    //     this.auth0.client.userInfo(authResult.accessToken, (error, user) => {
    //       if (error) reject(error);
    //       else resolve(user);
    //       console.log(user);
    //       return;
    //     });
    //   });
    // });
  }
}

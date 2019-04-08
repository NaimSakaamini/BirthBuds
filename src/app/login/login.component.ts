import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../classes/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private searchEmail: string;
  private error: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  register() {
    this.router.navigate(["/registration"]);
  }

  onSubmit() {
    if (this.searchEmail)
      this.userService.getUserByEmail(this.searchEmail).then((user: User) => {
        if (user) this.router.navigate(["/matches", this.searchEmail]);
        else this.error = `User with email ${this.searchEmail} doesn't exist`;
      });
  }
}

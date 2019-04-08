import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {NgForm} from "@angular/forms";
import {User} from "../classes/user";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  user: User = {
    FirstName: "a",
    LastName: "d",
    About: "f",
    City: "b",
    Country: "3",
    DOB: new Date(),
    Hospital: "a",
    Email: "asdf@qwer.com",
    Photo: "v",
    Twitter: "r",
    Facebook: "a"
  };
  selectedImage: File = null;
  private error: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserInfo();
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0];
  }

  async onSubmit(form: NgForm) {
    console.log("asdf");

    this.user.Photo = this.selectedImage
      ? await this.userService.uploadImage(this.selectedImage)
      : "";

    const getUserSub: Subscription = this.userService
      .getUsers()
      .subscribe((users: User[]) => getUserSub.unsubscribe());

    if (!(await this.userService.emailExists(this.user.Email))) {
      this.userService
        .addUser(this.user)
        .subscribe((res) => this.router.navigate(["/matches", this.user.Email]));
    } else {
      this.error = "An account with that email already exists!";
    }
  }
}

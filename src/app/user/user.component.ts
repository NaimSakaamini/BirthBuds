import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../classes/user";
import {UserService} from "../services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;
  error: string;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSub = this.ar.params.subscribe((params: Params) => {
      this.userService.getUser(params.id).subscribe(
        (user: User[]) => {
          if (user.length > 0) this.user = user[0];
          else this.router.navigate(["not-found/", "id", params.email]);
        },
        () => {
          if (params.id) this.router.navigate(["not-found/", "id", params.id]);
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }
}

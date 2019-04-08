import {Component, OnInit, OnDestroy} from "@angular/core";
import {User} from "../classes/user";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit, OnDestroy {
  currentUser: User;
  users: User[] = [];
  getUsersSub: Subscription;
  paramSub: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log("jaslkd;fjlk");
    // (async () => {
    //   const params: Params = await this.route.params.toPromise();

    //   console.log("qjwerkj;l");
    //   if (params.email) {
    //     this.currentUser = await this.userService.getUserByEmail(params.email);
    //     console.log("asdf");

    //     const users: User[] = await this.userService.getUsers().toPromise();
    //     this.users = users.filter(
    //       (user) =>
    //         user._id != this.currentUser._id &&
    //         user.DOB == this.currentUser.DOB &&
    //         user.Hospital == this.currentUser.Hospital
    //     );
    //   }
    // })();

    this.paramSub = this.route.params.subscribe((params: Params) => {
      if (params.email) {
        this.userService.getUserByEmail(params.email).then((foundUser: User) => {
          if (foundUser) {
            this.currentUser = foundUser;

            this.getUsersSub = this.userService.getUsers().subscribe((allUsers) => {
              this.users = allUsers.filter(
                (user) =>
                  user._id != this.currentUser._id &&
                  user.DOB == this.currentUser.DOB &&
                  user.Hospital == this.currentUser.Hospital
              );
            });
          } else {
            this.router.navigate(["not-found/", "email", params.email]);

            if (this.paramSub) this.paramSub.unsubscribe();
            if (this.getUsersSub) this.getUsersSub.unsubscribe();
          }
        });
      }
    });
  }

  showUser(id: number) {
    this.router.navigate(["user/", id]);
  }

  logout() {
    this.router.navigate([""]);
  }

  ngOnDestroy() {
    if (this.paramSub) this.paramSub.unsubscribe();
    if (this.getUsersSub) this.getUsersSub.unsubscribe();
  }
}

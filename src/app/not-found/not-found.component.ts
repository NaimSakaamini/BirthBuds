import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  private type: string;
  private content: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params: Params) => {
      if (params.content) this.content = params.content;
      if (params.type) this.type = params.type;
    });
  }

  ngOnDestroy() {
    if (this.paramSub) this.paramSub.unsubscribe();
  }
}

import {Directive} from "@angular/core";
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
  NG_ASYNC_VALIDATORS
} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "./services/user.service";

@Directive({
  selector: "[uniqueEmail]",
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailDirective, multi: true}]
})
export class UniqueEmailDirective implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // return this.userService.getUserByEmail(c.value).pipe(
    //   map((users) => {
    //     return users && users.length > 0 ? {uniqueEmai: true} : null;
    //   })
    // );
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }
}

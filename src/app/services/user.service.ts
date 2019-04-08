import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {User} from "../classes/user";
import {imgurUploader} from "imgur-uploader";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private url: string = "https://protected-hollows-82220.herokuapp.com/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: string): Observable<User[]> {
    return this.http.get<User[]>("https://protected-hollows-82220.herokuapp.com/user/" + id);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>("https://protected-hollows-82220.herokuapp.com/users/", user);
  }

  emailExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const getUserSub: Subscription = this.getUsers().subscribe((users: User[]) => {
        getUserSub.unsubscribe();

        resolve(users.filter((user) => user.Email == email).length > 0);
      });
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    // return new Promise((resolve, reject) => {
    const users = await this.getUsers().toPromise();
    return users.filter((user) => user.Email == email)[0];
    // const getUserSub: Subscription = this.getUsers().subscribe((users: User[]) => {
    //   getUserSub.unsubscribe();

    //   resolve(users.filter((user) => user.Email == email)[0]);
    // });
    // });
    // return this.http.get<any[]>("https://protected-hollows-82220.herokuapp.com/users/" + email);
  }

  // getBase64(file): Promise<string | ArrayBuffer> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // Returns url to image
  uploadImage(image: File): Promise<string> {
    return new Promise((resolve) => {
      const uploadSub = this.http
        .post("https://api.imgur.com/3/image", image, {
          headers: new HttpHeaders({authorization: "Client-ID 34b90e75ab1c04b"})
        })
        .subscribe((res: any) => {
          resolve(res.data.link);
          uploadSub.unsubscribe();
          return;
        });
    });
  }
}

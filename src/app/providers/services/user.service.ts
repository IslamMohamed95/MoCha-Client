import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public defaultImg = '../../../assets/DefaultImage.png';
  public isAuthed: Boolean;
  public token: any;
  public userData: any;
  public updatedPost: any;
  public userPosts: any = [];
  public posts: any;
  public selectedUser: any;

  UserURL = 'https://mocha-29is.onrender.com/api/user/';
  PostURL = 'https://mocha-29is.onrender.com/api/post/';

  public Users = [];

  constructor(private _http: HttpClient) {}

  users(): Observable<any> {
    return this._http.get(`${this.UserURL}users`);
  }

  registerUser(userData: User): Observable<any> {
    return this._http.post(`${this.UserURL}register`, userData);
  }

  userLogin(userData: any): Observable<any> {
    return this._http.post(`${this.UserURL}login`, userData);
  }

  userProfile(): Observable<any> {
    return this._http.get(`${this.UserURL}profile`);
  }

  updateUserProfile(User: any): Observable<any> {
    return this._http.post(`${this.UserURL}updateUserProfile`, User);
  }

  uploadProfilePic(profilePic: any): Observable<any> {
    return this._http.post(`${this.UserURL}uploadProfilePic`, profilePic);
  }

  logOut(token: any): Observable<any> {
    return this._http.post(`${this.UserURL}logOut`, token);
  }

  logOutAllDev(userID: any): Observable<any> {
    return this._http.post(`${this.UserURL}logOutAllDev`, userID);
  }

  //---------------- Post APIs --------------------------//

  createPost(post: Post): Observable<any> {
    return this._http.post(`${this.PostURL}addPost`, post);
  }

  deletePost(postId: any): Observable<any> {
    return this._http.post(`${this.PostURL}deletePost/${postId}`, postId);
  }

  TargetPost(postId: any): Observable<any> {
    return this._http.get(`${this.PostURL}TargetPost/${postId}`);
  }

  editPost(postId: any, updatedPost: any): Observable<any> {
    return this._http.post(`${this.PostURL}editPost/${postId}`, updatedPost);
  }

  comment(postId: any, comment: any): Observable<any> {
    return this._http.post(`${this.PostURL}Comment/${postId}`, comment);
  }

  //-----------------------------------------------------//

  getAllUserPosts(): Observable<any> {
    return this._http.get(`${this.PostURL}showUserPost`);
  }

  addFriend(friendId: any, userId: any): Observable<any> {
    return this._http.post(`${this.UserURL}addFriend/${friendId}`, userId);
  }

  deleteFriend(friendId: any, userId: any): Observable<any> {
    return this._http.post(`${this.UserURL}deleteFriend/${friendId}`, userId);
  }

  getFriends(): Observable<any> {
    return this._http.get(`${this.UserURL}Friends`);
  }

  userPage(userId: any): Observable<any> {
    return this._http.get(`${this.UserURL}userPage/${userId}`);
  }

  userPagePosts(userID: any): Observable<any> {
    return this._http.get(`${this.PostURL}userPagePost/${userID}`);
  }
}

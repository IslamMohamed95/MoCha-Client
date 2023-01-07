import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 iconState = false

 //--------------=---- Filteration --------------//
 filterUser:String = ''
 searchInput = 'Hide'
 userImg:String
 profilePicEmpty:Boolean
 
 //----------------------------------------------//

  constructor(public _auth: UserService, private route: Router) { }

  ngOnInit(): void {
   
  }

  HandelIcon(){
    this.iconState = !this.iconState
  }

  hideList(){
    this.iconState = !this.iconState
  }

  Logout(token:any){
    this.iconState = !this.iconState
    this._auth.isAuthed = false
    token = this._auth.token
    this._auth.logOut(token).subscribe(
      res => console.log(res.message),
      err => err
    )
  }

  logoutAll(userID:any){
    this.iconState = !this.iconState
    this._auth.isAuthed = false
    userID = this._auth.userData._id
    this._auth.logOutAllDev(userID).subscribe(
      res => console.log(res.message),
      err => console.log(err)
    )
  }

  clickEffect(){
    this._auth.users().subscribe(
      res => {
        res.allUsers.forEach( (user:any) => {
          if(user.profilePic === ""){
            this.userImg = this._auth.defaultImg
          }else {
            this.userImg = `http://localhost:3000/${user.profilePic}`
          }
        })
        this._auth.Users = res.allUsers
        
      },
      err => console.log(err)
    )
    if(this.searchInput === "Hide"){
      this.searchInput = "Show"
    }else {
      this.searchInput = "Hide"
    }
  }

  User(userId:any){
    this._auth.userPage(userId._id).subscribe(
      res => this._auth.selectedUser = res.user,
      err => console.log(err),
      () => {
        this.searchInput = "Hide"
        this.route.navigateByUrl('/userPage')
      }
    )
  }

}

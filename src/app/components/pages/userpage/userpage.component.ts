import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  userImg:any
  currentUser:any
  currentUserPosts:any
  userImage:any
  friendsBtnStatus = false

  constructor(public _auth: UserService) { }

  ngOnInit(): void {
    this._auth.userData.friends.forEach( (f:any) => {
      if(f.friendID === this._auth.selectedUser._id){
        this.friendsBtnStatus = true
      }
    });
    this.currentUser = this._auth.selectedUser
    if(this.currentUser.profilePic === ""){
      this.userImg = this._auth.defaultImg
    }else {
      this.userImg = `http://localhost:3000/${this._auth.selectedUser.profilePic}`
    }

    this._auth.userPagePosts(this._auth.selectedUser._id).subscribe(
      res => this.currentUserPosts = res.userPagePosts,
      e => console.log(e)
    )

    this.userImage = this._auth.userData.profilePic 
    if(this._auth.userData.profilePic === ""){
      this.userImage = this._auth.defaultImg
    }else {
      this.userImage = `http://localhost:3000/${this._auth.userData.profilePic}`
    }
  }

  addFriend(){
    this.friendsBtnStatus = true
    this._auth.addFriend(this._auth.selectedUser._id, this._auth.userData._id).subscribe(
      res => console.log(res.message),
      err => console.log(err)
    )
  }

  removeFriend(){
    this.friendsBtnStatus = false
    this._auth.deleteFriend(this._auth.selectedUser._id, this._auth.userData._id).subscribe(
      res => console.log(res.message),
      err => console.log(err)
    )
  }

}



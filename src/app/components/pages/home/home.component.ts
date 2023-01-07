import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Authed = true; // Nav bar elements authentication
  editIcon = false; // State of edit icon for post
  editButton = false; //state of edit button
  accImg: any;
  togglePostState: any = 'notClicked';
  filterFriend: String = '';
  postCont: any;
  setting: any;
  Friends: any;
  FriendImg: any;

  postsForm = new UntypedFormGroup({
    description: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  updatePostForm = new UntypedFormGroup({
    post: new UntypedFormControl('', [Validators.minLength(1), Validators.required]),
  });
  commentForm = new UntypedFormGroup({
    comment: new UntypedFormControl('', [Validators.required]),
  });

  constructor(public userservice: UserService, private route: Router) {}

  ngOnInit(): void {
    this.userservice.isAuthed = this.Authed;
    this.userservice.userProfile().subscribe(
      (res) => {
        this.userservice.userData = res;
        if (this.userservice.userData.profilePic === '') {
          this.accImg = this.userservice.defaultImg;
        } else {
          this.accImg = `http://localhost:3000/${this.userservice.userData.profilePic}`;
        }
      },
      (e) => e.message
    );

    this.userservice.getAllUserPosts().subscribe(
      (res) => {
        this.userservice.userPosts = res.data;
      },
      (err) => console.log(err)
    );

    this.userservice.getFriends().subscribe(
      (res) => {
        this.Friends = res;
        this.Friends.forEach((friend: any) => {
          if (friend.profilePic === '') {
            this.FriendImg = this.userservice.defaultImg;
          } else {
            this.FriendImg = `http://localhost:3000/${friend.profilePic}`;
          }
        });
      },
      (err) => console.log(err)
    );
  }

  get post() {
    return this.postsForm.get('post');
  }
  get updatePost() {
    return this.updatePostForm.get('post');
  }
  get comment() {
    return this.commentForm.get('comment');
  }

  //------------------ Post OPerations -----------------//
  createPost() {
    console.log(this.postsForm.value);
    if (this.postsForm.valid) {
      this.userservice.createPost(this.postsForm.value).subscribe(
        (res) => {
          console.log(res.message);
          this.userservice.userPosts.push(res.userPost);
        },
        (err) => console.log(err),
        () => {
          this.userservice.getAllUserPosts().subscribe(
            (res) => {
              console.log(res.data);
              this.userservice.userPosts = res.data;
            },
            (err) => console.log(err.message)
          );
          this.postsForm.reset();
        }
      );
    } else {
      console.log('not valid');
    }
  }

  clearPost() {
    this.postsForm.reset();
  }

  clearUpdatePost() {
    this.updatePostForm.reset();
  }

  update() {
    this.editButton = !this.editButton;
    this.userservice
      .editPost(this.userservice.updatedPost._id, this.updatePostForm.value)
      .subscribe(
        (res) => {
          this.updatePostForm.get('post');
          this.userservice.getAllUserPosts().subscribe(
            (res) => {
              this.userservice.userPosts = res.data;
            },
            (err) => console.log(err)
          );
        },
        (e) => console.log(e)
      );
  }

  commentFunc(p: any) {
    if (this.commentForm.valid) {
      this.userservice.comment(p._id, this.commentForm.value).subscribe(
        (res) => {
          console.log(res.message);
          this.userservice.getAllUserPosts().subscribe(
            (res) => {
              this.userservice.userPosts = res.data;
            },
            (err) => console.log(err)
          );
        },
        (e) => console.log(e),
        () => this.commentForm.reset()
      );
    }
  }
  //----------------------------------------------------//

  //------------------- Friend List --------------------//

  DisplayFriendPage(friendId: any) {
    console.log(friendId);
    this.route.navigateByUrl('/friend');
  }
  //----------------------------------------------------//

  //-------------------- Animation ---------------------//
  toggleEditState(post: any) {
    this.editIcon = !this.editIcon;
    post.active = !post.active;
  }

  handleEditClick(post: any) {
    post.active = !post.active;
    this.editButton = !this.editButton;
    this.editIcon = !this.editIcon;
    this.userservice.TargetPost(post._id).subscribe(
      (res) => {
        this.userservice.updatedPost = res.activePost;
        this.updatePostForm.patchValue({
          post: res.activePost.post,
        });
      },
      (e) => console.log(e)
    );
  }

  deletePost(post: any) {
    this.userservice.deletePost(post._id).subscribe(
      (res) => console.log(res.message),
      (err) => console.log(err),
      () => {
        this.userservice.getAllUserPosts().subscribe(
          (res) => {
            this.userservice.userPosts = res.data;
          },
          (err) => console.log(err)
        );
      }
    );
  }

  closeEdit() {
    this.editButton = !this.editButton;
  }

  toggleSetting() {
    this.setting = !this.setting;
  }
  //----------------------------------------------------//
}

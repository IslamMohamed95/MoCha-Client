import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  uploadedFile: any; // Hold the selectied file or (image)
  viewImg: any; // View browsed (image)

  selectedImgOnEdit = false; // Boolean var to switch between (2 case)

  // Holders for switch between (Profile view page) & (Profile edit page)
  editClicked = '';
  updateClicked = '';

  showEditForm = '';

  accImg: any;

  updateFrom = new UntypedFormGroup({
    firstname: new UntypedFormControl(`${this._auth.userData.firstname}`, []),
    lastname: new UntypedFormControl(`${this._auth.userData.lastname}`, []),
    email: new UntypedFormControl(`${this._auth.userData.email}`, []),
    password: new UntypedFormControl(`${this._auth.userData.password}`, []),
    birthDate: new UntypedFormControl(`${this._auth.userData.birthDate}`, []),
    gender: new UntypedFormControl(`${this._auth.userData.gender}`, []),
  });

  constructor(
    public _auth: UserService,
    private _route: Router,
    private ProfileImg: UserService
  ) {}

  // After Start it Send the user data to view
  ngOnInit(): void {
    this._auth.userProfile().subscribe(
      (res) => {
        this._auth.userData = res;
        if (this._auth.userData.profilePic === '') {
          this.accImg = this._auth.defaultImg;
        } else {
          this.accImg = `http://localhost:3000/${this._auth.userData.profilePic}`;
        }
      },
      (e) => {
        console.log(e);
      }
    );
  }

  get firstname() {
    return this.updateFrom.get('firstname');
  }
  get lastname() {
    return this.updateFrom.get('lastname');
  }
  get email() {
    return this.updateFrom.get('email');
  }
  get password() {
    return this.updateFrom.get('password');
  }
  get birthDate() {
    return this.updateFrom.get('birthDate');
  }
  get gender() {
    return this.updateFrom.get('gender');
  }

  // Event of selecting image and display it for user to review it
  onChange(e: any) {
    this.uploadedFile = e.target.files[0];
    this.updateFrom.patchValue({ ProfilePic: this.uploadedFile });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (
      this.uploadedFile &&
      allowedMimeTypes.includes(this.uploadedFile.type)
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImgOnEdit = true;
        this.viewImg = reader.result;
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }

  handleUpdateFrom() {
    if (this.updateFrom.valid) {
      this._auth.updateUserProfile(this.updateFrom.value).subscribe(
        (res) => {
          const fd = new FormData();
          fd.append('imgProfile', this.uploadedFile);
          if (this.selectedImgOnEdit === true) {
            this.ProfileImg.uploadProfilePic(fd).subscribe((err) =>
              console.log(err)
            );
          }
          console.log(res.message);
        },
        (e) => {
          console.log(e);
        },
        () => {
          this._route.navigateByUrl('/home');
        }
      );
    }
  }

  //check state if button clicked switch to the (edit page)
  EditClicked(state: any) {
    this.editClicked = state;
    if (this.editClicked == 'done') {
      this.showEditForm = 'show';
    }
  }
}

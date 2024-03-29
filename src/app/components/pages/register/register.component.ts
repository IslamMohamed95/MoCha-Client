import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  msg = '';
  emailUsedBefore: Boolean = false;
  isSubmitted: Boolean = false; //A flag cause submitted not working in (FormGroup) in HTML

  registerForm = new UntypedFormGroup({
    firstname: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    birthDate: new UntypedFormControl('', [Validators.required]),
    gender: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private _auth: UserService, private _route: Router) {}
  ngOnInit(): void {}

  get firstname() {
    return this.registerForm.get('firstname');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get birthDate() {
    return this.registerForm.get('birthDate');
  }
  get gender() {
    return this.registerForm.get('gender');
  }

  handleRegister() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this._auth.registerUser(this.registerForm.value).subscribe(
        (res) => {
          this.emailUsedBefore = false;
          console.log(res.message);
          this._auth.userData = res.User;
        },
        (e) => {
          console.log(e), (this.emailUsedBefore = true);
        },
        () => {
          this.registerForm.reset();
          this.isSubmitted = false;
          this._route.navigateByUrl('/');
        }
      );
    } else {
      this.msg = 'Pleas fill all required fields';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg = ""
  userError:String = "" 
  invalidData: Boolean = false
  isSubmitted : Boolean = false

  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  constructor(private _auth:UserService, private _route:Router) { }

  ngOnInit(): void {
  }

  handleLogin(){
    this.isSubmitted = true
    if(this.loginForm.valid){
      this._auth.userLogin(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem("userToken", res.data.token)
          
          this._auth.userData = res.data.userData
        },
        (e) => {
          this.userError = "User Not Found"
          console.log(e)
        },
        () => {
          this._auth.token = localStorage.getItem('userToken')
          this.loginForm.reset()
          this.msg=""
          this._route.navigateByUrl('/home')
        }
      )
    }else{
      this.msg="Invalid email or password"
    }
  }

}

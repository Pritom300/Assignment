import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../_interfaces/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  credentials: LoginModel = {Username:'', Password:''};

  constructor(private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
  }

  login(form:NgForm)
  {
    const credentials = {
      'UserName':form.value.Username,
      'Password':form.value.Password
    }

    this.http.post("https://localhost:5001/api/account/login",credentials).subscribe(response=>{
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(['/']);
    }, error=>{
      this.invalidLogin = true;
    })

  }

}

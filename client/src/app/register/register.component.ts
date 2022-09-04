
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterModel } from '../_interfaces/register.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  invalidLogin: boolean;
  credentials: RegisterModel = {Username:'', Password:''};

  constructor(private router: Router,private http: HttpClient) { }

  invalidRegister: boolean;

  credentials1: RegisterModel = {Username:'', Password:''};


  ngOnInit(): void {
  }

  register(form:NgForm)
  {
    const credentials1 = {
      'UserName':form.value.Username,
      'Password':form.value.Password
    }

    this.http.post("https://localhost:5001/api/account/register",credentials1).subscribe(response=>{
      
      this.router.navigate(['/']);
    }, error=>{
      this.invalidLogin = true;
    })

  }

}

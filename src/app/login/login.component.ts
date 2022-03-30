import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
declare var jQuery: any;

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user.model';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user:User;
  error :boolean = false;
  eroorMessage :string;
  private currentUserSubject_stay_active: BehaviorSubject<String>;
  public currentUser_stay_active: Observable<String>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.currentUserSubject_stay_active = new BehaviorSubject(
      JSON.parse(localStorage.getItem('active_pwd_session'))
    );
    this.currentUser_stay_active =
      this.currentUserSubject_stay_active.asObservable();
  }

  public get currentUserValue_stay_active(): String {
    return this.currentUserSubject_stay_active.value;
  }
  StayLoggedIn(e) {
    if (e.target.checked) {
      localStorage.setItem(
        'active_pwd_session',
        JSON.stringify(Md5.hashAsciiStr(this.fval_1.password.value))
      );
      this.currentUserSubject_stay_active.next(
        localStorage.getItem('active_pwd_session')
      );
    } else {
      localStorage.removeItem('active_pwd_session');
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      isChecked: [true],
       
    });

    (function ($) {
      $('.navbar-toggler').on('click', function () {
        $('html').toggleClass('nav-open');
      });
      //=============================================================================
      $('.form-control')
        .on('focus', function () {
          $(this).parent('.input-group').addClass('input-group-focus');
        })
        .on('blur', function () {
          $(this).parent('.input-group').removeClass('input-group-focus');
        });
    })(jQuery);
    this.user=this.loginForm.value
    //console.log(this.user.role.type)
  }

  // for accessing to form fields
  get fval_1() {
    return this.loginForm.controls;
  }

  onSignIn() {
    let r,t,status,id;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.fval_1.email.value, this.fval_1.password.value)
      .subscribe(
        (data) => {
          console.log(data)
          setitem(data)
          console.log(data[0].role.type)
          r=data[0].role.type;
          /*t=data[0].etablissement.type  //---> type de etablissmeent mais ne retour pas dans login eseneigant,nt et etudiant ;; 
          status =data[0].status;
          console.log(t)
          
          if(t != "")
          {
          if(r == "SuperAdmin" )
          {this.router.navigate(['/backoffice']);
          console.log("eeeee")}
          }

          if(t == "créche")
          {
            if(r == "Directeur" )
            {
              if(status == true)
              {
              this.router.navigate(['/DirecteurHomeCrech',{caller : this.fval_1.email.value}]);
              console.log("eeeee")
              }
               
              
              
            }
          }*/
          status =data[0].status;
          //id=data[0]._id;
          if(r == "SuperAdmin" )
          {this.router.navigate(['/backoffice']);
          console.log("eeeee")}
          
         
            if(r == "Enseignant" )
            {
              if(status == true)
              {
              this.router.navigate(['/EnseignantHome']);
              console.log("cccccc")
              }
            }

            if(r == "Etudiant" )
            {
              if(status == true)
              {
              this.router.navigate(['/EtudiantHome',data[0].classe]);
              console.log("cccccc")
              }
            }

            if(r == "Directeur" )
            {
              if(status == true)
              {
              this.router.navigate(['/DirecteurHomeCrech',{caller : this.fval_1.email.value}]);
              console.log("eeeee")
              }
            }
          
        },
    
        (error) => {
          this.toastr.error(error.error.message, 'Error');
          this.loading = false;
          console.log(error.error)
          this.error=true
          this.eroorMessage=error.error
          
        }
      );
      async function setitem(data) {
          await localStorage.setItem('token',data[1])
      }
        
      }
  }


import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      policy_checked: [false, Validators.required],
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
  }

  // for accessing to form fields
  get fval_2() {
    return this.registerForm.controls;
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  onSignUp() {
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    this.loading = true;
    console.log('enabled');
    this.authenticationService.register(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        this.toastr.success(
          'Vous êtes inscrit maintenant! Merci de se connecter'
        );
        this.redirectTo('/login');
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    );
    console.log('all done');
  }
}

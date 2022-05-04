import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-profile-passowrd',
  templateUrl: './update-profile-passowrd.component.html',
  styleUrls: ['./update-profile-passowrd.component.scss']
})
export class UpdateProfilePassowrdComponent implements OnInit {

  id:string;
  user:User=new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  eroorMessage :string;
  
  d;
  error: boolean =false;
  user2:User=new User();
  idPath;
  ids;
 
 
 
  constructor(private userService :UserService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
   ) {}

  ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.userService.getUserById(this.id).subscribe(data=>{
      
      this.user=data;
     


      this.registerForm = this.formBuilder.group({
        
        password: ['', [Validators.required , Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
        newpassword: ['', [Validators.required , Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
        confirmpassword: ['', [Validators.required , Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
        
        //policy_checked: [false, Validators.required],
      });
      this.idPath=this.router.url.split('/');
    console.log(this.idPath[2])
    this.ids=this.idPath[2]
    console.log("ioi",this.ids)
     })
    
    
   
  }
 

  get fval_2() {
    return this.registerForm.controls;
  }
  onSubmit()
  {
    this.user.password=this.user2.password
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    console.log("eeee")
    //this.registerForm.value.phone="+"+this.countryCode+this.registerForm.value.phone;
    this.userService.EditPasswordUser(this.id , this.registerForm.value).subscribe( (data) => {
      console.log(data)
     this.goToCategoriesList();
      
    },
    (error) => {
      //this.toastr.error(error.error.message, 'Error');
      this.loading = false;
      console.log(error.error)
      this.error=true
      this.eroorMessage=error.error
      
    }
  );
  }
  

  goToCategoriesList()
  {
    this.router.navigate(['/EtudiantHome/'+this.ids+'/profile']);
  }
  
  back()
  {
   console.log("mouha")
   this.router.navigate(['EtudiantHome/'+this.ids+'/profile'])
   console.log("eeeeeeeeeeeeeee")
  }

}

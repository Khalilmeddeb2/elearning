import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ToastrModule } from 'ngx-toastr';

import {
  CommonModule,
  HashLocationStrategy,
  Location,
  LocationStrategy,
} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './backoffice/products/products.component';
import { AddComponent } from './backoffice/products/add/add.component';
import { MainComponent } from './backoffice/main/main.component';
import { RoleComponent } from './backoffice/role/role.component';
import { AddRoleComponent } from './backoffice/role/add-role/add-role.component';
import { UserListComponent } from './backoffice/user-list/user-list.component';
import { AddUserComponent } from './backoffice/user-list/add-user/add-user.component';
import { UpdateUserComponent } from './backoffice/user-list/update-user/update-user.component';
import { TemplateCrecheComponent } from './creche/directeur/template-creche/template-creche.component';
import { HomeEnseigCrecheComponent } from './creche/enseignant/home-enseig-creche/home-enseig-creche.component';
import { HomeParentCrecheComponent } from './creche/parent/home-parent-creche/home-parent-creche.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UpdateRoleComponent } from './backoffice/role/update-role/update-role.component';
import { EtablissementComponent } from './backoffice/etablissement/etablissement.component';
import { AddEtablissementComponent } from './backoffice/etablissement/add-etablissement/add-etablissement.component';
import { UpdateEtablissementComponent } from './backoffice/etablissement/update-etablissement/update-etablissement.component';
import { TokenInterceptorServiceService } from './_services/token-interceptor-service.service';

import { EtbalissementemplComponent } from './Etablissements/etbalissementempl/etbalissementempl.component';
import { MatieresComponent } from './Etablissements/etbalissementempl/matieres/matieres.component';
import { AddMatiereComponent } from './Etablissements/etbalissementempl/matieres/add-matiere/add-matiere.component';
import { UpdateMatiereComponent } from './Etablissements/etbalissementempl/matieres/update-matiere/update-matiere.component';
import { EnseignantsComponent } from './Etablissements/etbalissementempl/enseignants/enseignants.component';
import { AddEnseignantComponent } from './Etablissements/etbalissementempl/enseignants/add-enseignant/add-enseignant.component';
import { UpdateEnseignantComponent } from './Etablissements/etbalissementempl/enseignants/update-enseignant/update-enseignant.component';
import { ClassesComponent } from './Etablissements/etbalissementempl/classes/classes.component';
import { AddClassesComponent } from './Etablissements/etbalissementempl/classes/add-classes/add-classes.component';
import { UpdateClasseComponent } from './Etablissements/etbalissementempl/classes/update-classe/update-classe.component';
import { DirecteurHomeComponent } from './Etablissements/etbalissementempl/directeur-home/directeur-home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EtudiantsComponent } from './Etablissements/etbalissementempl/etudiants/etudiants.component';
import { AddEtudiantComponent } from './Etablissements/etbalissementempl/etudiants/add-etudiant/add-etudiant.component';
import { UpdateEtudiantComponent } from './Etablissements/etbalissementempl/etudiants/update-etudiant/update-etudiant.component';
import { ViewClasseComponent } from './Etablissements/etbalissementempl/classes/view-classe/view-classe.component';
//import { TemplEnseignantComponent } from './Etablissements/templ-enseignant/templ-enseignant.component';
import { EnseignantHomeComponent } from './Etablissements/Enseignant/templ-enseignant/enseignant-home/enseignant-home.component';
import { TemplEnseignantComponent } from './Etablissements/Enseignant/templ-enseignant/templ-enseignant.component';
import { ClassesEnseigComponent } from './Etablissements/Enseignant/templ-enseignant/classes-enseig/classes-enseig.component';
import { CoursComponent } from './Etablissements/Enseignant/templ-enseignant/cours/cours.component';
import { AddCoursComponent } from './Etablissements/Enseignant/templ-enseignant/cours/add-cours/add-cours.component';
import { UpdateCoursComponent } from './Etablissements/Enseignant/templ-enseignant/cours/update-cours/update-cours.component';
import { MatieresEnseigComponent } from './Etablissements/Enseignant/templ-enseignant/matieres-enseig/matieres-enseig.component';
import { ListEtudiantsComponent } from './Etablissements/Enseignant/templ-enseignant/list-etudiants/list-etudiants.component';
import { TemplEtudiantComponent } from './Etablissements/Etudiant/templ-etudiant/templ-etudiant.component';
import { EtudiantHomeComponent } from './Etablissements/Etudiant/templ-etudiant/etudiant-home/etudiant-home.component';
import { CoursEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/cours-etudiants/cours-etudiants.component';
//import { TemplEtudiantComponent } from './Etablissements/Etudiant/templ-etudiant/templ-etudiant.component';
//import { EtudiantHomeComponent } from './Etablissements/Etudiant/templ-etudiant/etudiant-home/etudiant-home.component';
//import { CoursEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/cours-etudiants/cours-etudiants.component';
//import { TemplEtudiantComponent } from './Etablissements/templ-etudiant/templ-etudiant.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
//
import { AngularEditorModule } from '@kolkov/angular-editor';
//import { AddCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours/add-cours-by-description/add-cours-by-description.component';
import { CoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/cours-by-description.component';
import { AddCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/add-cours-by-description/add-cours-by-description.component';
import { ViewCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/view-cours-by-description/view-cours-by-description.component';
import { UpdateCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/update-cours-by-description/update-cours-by-description.component';
import { CoursByDescriptionEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/cours-by-description-etudiants/cours-by-description-etudiants.component';
//import { ViewCoursByDescriptionEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/view-cours-by-description-etudiants/view-cours-by-description-etudiants.component';
import { ViewCoursComponent } from './view-cours/view-cours.component';
import { ExercicesComponent } from './Etablissements/Enseignant/templ-enseignant/exercices/exercices.component';
import { AddExerciceComponent } from './Etablissements/Enseignant/templ-enseignant/exercices/add-exercice/add-exercice.component';
import { QuizComponent } from './Etablissements/Enseignant/templ-enseignant/exercices/quiz/quiz.component';
import { QuestionsComponent } from './Etablissements/Enseignant/templ-enseignant/questions/questions.component';
import { AddQuestionComponent } from './Etablissements/Enseignant/templ-enseignant/questions/add-question/add-question.component';
import { UpdateExerciceComponent } from './Etablissements/Enseignant/templ-enseignant/exercices/update-exercice/update-exercice.component';
import { ViewExerciceComponent } from './Etablissements/Enseignant/templ-enseignant/exercices/view-exercice/view-exercice.component';
import { ExercicesEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/exercices-etudiants/exercices-etudiants.component';
import { VoirExerciceComponent } from './Etablissements/Etudiant/templ-etudiant/exercices-etudiants/voir-exercice/voir-exercice.component';
import { ViewCoursEnseignantComponent } from './view-cours-enseignant/view-cours-enseignant.component';
import { ProfileComponent } from './Etablissements/Etudiant/templ-etudiant/profile/profile.component';
import { UpdateProfileInformationsComponent } from './Etablissements/Etudiant/templ-etudiant/profile/update-profile-informations/update-profile-informations.component';
import { UpdateProfilePassowrdComponent } from './Etablissements/Etudiant/templ-etudiant/profile/update-profile-passowrd/update-profile-passowrd.component';
import { ProfilEnseignantComponent } from './Etablissements/Enseignant/templ-enseignant/profil-enseignant/profil-enseignant.component';
import { UpdateInformationsComponent } from './Etablissements/Enseignant/templ-enseignant/profil-enseignant/update-informations/update-informations.component';
import { UpdatePasswordComponent } from './Etablissements/Enseignant/templ-enseignant/profil-enseignant/update-password/update-password.component';
import { UpdateQuestionComponent } from './Etablissements/Enseignant/templ-enseignant/questions/update-question/update-question.component';
import { GetMatiereComponent } from './Etablissements/Enseignant/templ-enseignant/exercices/get-matiere/get-matiere.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { UpdatephotoComponent } from './Etablissements/Enseignant/templ-enseignant/profil-enseignant/updatephoto/updatephoto.component';
import { UpdatePhotoEtudiantComponent } from './Etablissements/Etudiant/templ-etudiant/profile/update-photo-etudiant/update-photo-etudiant.component';
import { TestsComponent } from './Etablissements/Enseignant/templ-enseignant/tests/tests.component';
import { AddTestComponent } from './Etablissements/Enseignant/templ-enseignant/tests/add-test/add-test.component';
import { ViewTestComponent } from './Etablissements/Enseignant/templ-enseignant/tests/view-test/view-test.component';
import { TestsEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/tests-etudiants/tests-etudiants.component';
import { VoirTestComponent } from './Etablissements/Etudiant/templ-etudiant/tests-etudiants/voir-test/voir-test.component';
import { TemplParentComponent } from './Etablissements/Parent/templ-parent/templ-parent.component';
import { AccueilComponent } from './Etablissements/Parent/templ-parent/accueil/accueil.component';
import { UpdateTestComponent } from './Etablissements/Enseignant/templ-enseignant/tests/update-test/update-test.component';
import { VoirNotesEtudiantsComponent } from './Etablissements/Enseignant/templ-enseignant/tests/voir-notes-etudiants/voir-notes-etudiants.component';
import { EnfantsComponent } from './Etablissements/etbalissementempl/enfants/enfants.component';
import { AddEnfantComponent } from './Etablissements/etbalissementempl/enfants/add-enfant/add-enfant.component';
import { UpdateEnfantComponent } from './Etablissements/etbalissementempl/enfants/update-enfant/update-enfant.component';
import { ListEnfantsComponent } from './Etablissements/Enseignant/templ-enseignant/list-enfants/list-enfants.component';
import { AjoutPhotoEnfantComponent } from './Etablissements/Enseignant/templ-enseignant/list-enfants/ajout-photo-enfant/ajout-photo-enfant.component';
import { ListesPhotosEnfantsComponent } from './Etablissements/Enseignant/templ-enseignant/list-enfants/listes-photos-enfants/listes-photos-enfants.component';
import { ParentsComponent } from './Etablissements/etbalissementempl/parents/parents.component';
import { AddParentComponent } from './Etablissements/etbalissementempl/parents/add-parent/add-parent.component';
import { UpdateParentComponent } from './Etablissements/etbalissementempl/parents/update-parent/update-parent.component';
import { ListesEnfantsComponent } from './Etablissements/Parent/templ-parent/listes-enfants/listes-enfants.component';
import { ListesPhotosEnfantsByParentComponent } from './Etablissements/Parent/templ-parent/listes-enfants/listes-photos-enfants-by-parent/listes-photos-enfants-by-parent.component';
import { ActualitesComponent } from './backoffice/actualites/actualites.component';
import { UpdateActualiteComponent } from './backoffice/actualites/update-actualite/update-actualite.component';
import { AddActualiteComponent } from './backoffice/actualites/add-actualite/add-actualite.component';
import { DownloadTestComponent } from './download-test/download-test.component';




//import { ExercicesComponent } from './exercices/exercices.component';
//import { AddExericeComponent } from './add-exerice/add-exerice.component';
//import { QuizComponent } from './Etablissements/Enseignant/templ-enseignant/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackofficeComponent,
    RegisterComponent,
    ProductsComponent,
    AddComponent,
    MainComponent,
    RoleComponent,
    AddRoleComponent,
    UserListComponent,
    AddUserComponent,
    UpdateUserComponent,
    TemplateCrecheComponent,
    HomeEnseigCrecheComponent,
    HomeParentCrecheComponent,
    UpdateRoleComponent,
    EtablissementComponent,
    AddEtablissementComponent,
    UpdateEtablissementComponent,
  
    EtbalissementemplComponent,
  
    MatieresComponent,
  
    AddMatiereComponent,
  
    UpdateMatiereComponent,
  
    EnseignantsComponent,
  
    AddEnseignantComponent,
  
    UpdateEnseignantComponent,
  
    ClassesComponent,
  
    AddClassesComponent,
  
    UpdateClasseComponent,
  
    DirecteurHomeComponent,
  
    EtudiantsComponent,
  
    AddEtudiantComponent,
  
    UpdateEtudiantComponent,
  
    ViewClasseComponent,
  
    TemplEnseignantComponent,
  
    EnseignantHomeComponent,
  
    ClassesEnseigComponent,
  
    CoursComponent,
  
    AddCoursComponent,
  
    UpdateCoursComponent,
  
    MatieresEnseigComponent,
  
    ListEtudiantsComponent,
  
    TemplEtudiantComponent,
  
    EtudiantHomeComponent,
  
    CoursEtudiantsComponent,
  
    AddCoursByDescriptionComponent,
  
    CoursByDescriptionComponent,
  
    ViewCoursByDescriptionComponent,
  
    UpdateCoursByDescriptionComponent,
  
    CoursByDescriptionEtudiantsComponent,
  
    //ViewCoursByDescriptionEtudiantsComponent,
  
    ViewCoursComponent,
  
    ExercicesComponent,
  
    AddExerciceComponent,
  
    QuizComponent,
  
    QuestionsComponent,
  
    AddQuestionComponent,
  
    UpdateExerciceComponent,
  
    ViewExerciceComponent,
  
    ExercicesEtudiantsComponent,
  
    VoirExerciceComponent,
  
    ViewCoursEnseignantComponent,
  
    ProfileComponent,
  
    UpdateProfileInformationsComponent,
  
    UpdateProfilePassowrdComponent,
  
    ProfilEnseignantComponent,
  
    UpdateInformationsComponent,
  
    UpdatePasswordComponent,
  
    UpdateQuestionComponent,
  
    GetMatiereComponent,
  
    UpdatephotoComponent,
  
    UpdatePhotoEtudiantComponent,
  
    TestsComponent,
  
    AddTestComponent,
  
    ViewTestComponent,
  
    TestsEtudiantsComponent,
  
    VoirTestComponent,
  
    TemplParentComponent,
  
    AccueilComponent,
  
    UpdateTestComponent,
  
    VoirNotesEtudiantsComponent,
  
    EnfantsComponent,
  
    AddEnfantComponent,
  
    UpdateEnfantComponent,
  
    ListEnfantsComponent,
  
    AjoutPhotoEnfantComponent,
  
    ListesPhotosEnfantsComponent,
  
    ParentsComponent,
  
    AddParentComponent,
  
    UpdateParentComponent,
  
    ListesEnfantsComponent,
  
    ListesPhotosEnfantsByParentComponent,
  
    ActualitesComponent,
  
    UpdateActualiteComponent,
  
    AddActualiteComponent,
  
    DownloadTestComponent,
  
    
  
  
   
  
    
  
   
    
  
   
  
    //ExercicesComponent,
  
    //AddExericeComponent,
  
    //QuizComponent,
  
    //TemplEtudiantComponent,
  
    //EtudiantHomeComponent,
  
    //CoursEtudiantsComponent,
  
  
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    FormsModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSummernoteModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2TelInputModule,
    //
    AngularEditorModule,
    ToastrModule.forRoot(),
    //
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    //

    UiSwitchModule. forRoot ( { 
      size : 'small' , 
      color : 'rgb(0, 189, 99)' , 
      switchColor : '#80FFA2' , 
      defaultBgColor : '#00ACFF' , 
      defaultBoColor :'#476EFF' , 
      //CheckedLabel : 'on' , 
      uncheckedLabel : 'off' 
    } ) ,
   
  ],
  providers: [
    AuthGuard,
    Location,
   
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorServiceService,
      multi : true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

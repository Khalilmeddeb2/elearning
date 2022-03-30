import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthLoginGuard } from './_helpers/auth-login.guard';
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
import { UpdateRoleComponent } from './backoffice/role/update-role/update-role.component';
import { EtablissementComponent } from './backoffice/etablissement/etablissement.component';
import { AddEtablissementComponent } from './backoffice/etablissement/add-etablissement/add-etablissement.component';
import { UpdateEtablissementComponent } from './backoffice/etablissement/update-etablissement/update-etablissement.component';
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
import { EtudiantsComponent } from './Etablissements/etbalissementempl/etudiants/etudiants.component';
import { AddEtudiantComponent } from './Etablissements/etbalissementempl/etudiants/add-etudiant/add-etudiant.component';
import { UpdateEtudiantComponent } from './Etablissements/etbalissementempl/etudiants/update-etudiant/update-etudiant.component';
import { ViewClasseComponent } from './Etablissements/etbalissementempl/classes/view-classe/view-classe.component';
import { TemplEnseignantComponent } from './Etablissements/Enseignant/templ-enseignant/templ-enseignant.component';
import { EnseignantHomeComponent } from './Etablissements/Enseignant/templ-enseignant/enseignant-home/enseignant-home.component';
import { ClassesEnseigComponent } from './Etablissements/Enseignant/templ-enseignant/classes-enseig/classes-enseig.component';
import { CoursComponent } from './Etablissements/Enseignant/templ-enseignant/cours/cours.component';
import { AddCoursComponent } from './Etablissements/Enseignant/templ-enseignant/cours/add-cours/add-cours.component';
import { UpdateCoursComponent } from './Etablissements/Enseignant/templ-enseignant/cours/update-cours/update-cours.component';
import { MatieresEnseigComponent } from './Etablissements/Enseignant/templ-enseignant/matieres-enseig/matieres-enseig.component';
import { ListEtudiantsComponent } from './Etablissements/Enseignant/templ-enseignant/list-etudiants/list-etudiants.component';
import { TemplEtudiantComponent } from './Etablissements/Etudiant/templ-etudiant/templ-etudiant.component';
import { EtudiantHomeComponent } from './Etablissements/Etudiant/templ-etudiant/etudiant-home/etudiant-home.component';
import { CoursEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/cours-etudiants/cours-etudiants.component';
//import { AddCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours/add-cours-by-description/add-cours-by-description.component';
import { CoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/cours-by-description.component';
import { AddCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/add-cours-by-description/add-cours-by-description.component';
import { ViewCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/view-cours-by-description/view-cours-by-description.component';
import { UpdateCoursByDescriptionComponent } from './Etablissements/Enseignant/templ-enseignant/cours-by-description/update-cours-by-description/update-cours-by-description.component';
import { CoursByDescriptionEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/cours-by-description-etudiants/cours-by-description-etudiants.component';
import { ViewCoursByDescriptionEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/view-cours-by-description-etudiants/view-cours-by-description-etudiants.component';
import { ViewCoursComponent } from './view-cours/view-cours.component';
//import { TemplEtudiantComponent } from './Etablissements/Etudiant/templ-etudiant/templ-etudiant.component';
//import { EtudiantHomeComponent } from './Etablissements/Etudiant/templ-etudiant/etudiant-home/etudiant-home.component';
//
//import { CoursEtudiantsComponent } from './Etablissements/Etudiant/templ-etudiant/cours-etudiants/cours-etudiants.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
  { path: 'viewCours/:id', component: ViewCoursComponent, canActivate: [AuthLoginGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthLoginGuard],
  },
  
  {
    path: 'backoffice',
    component: BackofficeComponent,
    //canActivate: [AuthLoginGuard],
    canActivate: [AuthGuard], //--> tebe3 login hedha yebloqui acces al backoffice 
    //data: { roles: [Role.Admin] },
    //data: { roles: ["Admin"] },
    //canActivateChild: [AuthGuard],

    children: [
      { path: '', component: MainComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: AddComponent },
      { path: 'roles', component: RoleComponent },
      { path: 'roles/addRole', component: AddRoleComponent },
      { path: 'roles/updateRole/:id', component: UpdateRoleComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/addUser', component: AddUserComponent },
      { path: 'users/updateUser/:id', component: UpdateUserComponent },
      { path: 'etablissements', component: EtablissementComponent },
      { path: 'etablissements/addEtablissement', component: AddEtablissementComponent },
      { path: 'etablissements/updateEtablissement/:id', component: UpdateEtablissementComponent },
      
      

    ], 
  },
  {
    path: 'DirecteurHomeCrech',
    component: EtbalissementemplComponent,
    canActivate: [AuthGuard],
    //data: { roles: ["Directeur"] },

    //data: { roles: ["Directeur"] },
    children: [
      //{ path: '', component: MainComponent },
      { path: '', component: DirecteurHomeComponent },
      { path: 'matieres', component: MatieresComponent },
      { path: 'matieres/addMatiere', component: AddMatiereComponent },
      { path: 'matieres/UpdateMatiere/:id', component: UpdateMatiereComponent },
      { path: 'enseignants', component: EnseignantsComponent },
      { path: 'enseignants/addEnseignant', component: AddEnseignantComponent },
      { path: 'enseignants/UpdateEnseignant/:id', component: UpdateEnseignantComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'classes/addClasse', component: AddClassesComponent },
      { path: 'classes/UpdateClasse/:id', component: UpdateClasseComponent },
      { path: 'classes/ViewClasse/:id', component: ViewClasseComponent },
      { path: 'etudiants', component: EtudiantsComponent },
      { path: 'etudiants/addEtudiant', component: AddEtudiantComponent },
      { path: 'etudiants/UpdateEtudiant/:id', component: UpdateEtudiantComponent },
      //{ path: 'products/add', component: AddComponent },
      //{ path: 'roles', component: RoleComponent },
      //{ path: 'roles/addRole', component: AddRoleComponent },
      //{ path: 'users', component: UserListComponent },
      //{ path: 'users/addUser', component: AddUserComponent },
      //{ path: 'users/updateUser/:id', component: UpdateUserComponent },
      

    ],
  },
  {
    path: 'EnseignantHome',
    component: TemplEnseignantComponent,
    canActivate: [AuthGuard],
    //data: { roles: ["Enseignant"] },

    children: [
      { path: '', component: EnseignantHomeComponent },
      { path: 'classes', component: ClassesEnseigComponent },
      { path: 'classes/ListesEtudiants/:id', component: ListEtudiantsComponent },
      { path: 'matieres', component: MatieresEnseigComponent },
      { path: 'doucuments', component: CoursComponent },
      { path: 'doucuments/addDoucument', component: AddCoursComponent },
      { path: 'doucuments/UpdateDoucument/:id', component: UpdateCoursComponent },
      { path: 'cours', component: CoursByDescriptionComponent },
      { path: 'cours/CreateCours', component: AddCoursByDescriptionComponent },
      { path: 'cours/ViewCours/:id', component: ViewCoursByDescriptionComponent },
      { path: 'cours/UpdateCours/:id', component: UpdateCoursByDescriptionComponent },
      //viewListesEtudiants
      //{ path: 'classes/ViewClasse/:id', component: ViewClasseComponent },
  ]
  },

  {
    path: 'EtudiantHome/:id',
    component: TemplEtudiantComponent,
    canActivate: [AuthGuard],
    //data: { roles: ["Enseignant"] },

    children: [
      { path: '', component: EtudiantHomeComponent },
      { path: 'doucuments', component: CoursEtudiantsComponent },
      { path: 'cours', component: CoursByDescriptionEtudiantsComponent },
      { path: 'cours/ViewCours/:id', component: ViewCoursByDescriptionEtudiantsComponent },

      //viewListesEtudiants
      //{ path: 'classes/ViewClasse/:id', component: ViewClasseComponent },
  ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    //imports: [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


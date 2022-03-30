import { Classe } from "./classe";
import { Etablissement } from "./etablissement";
import { Matiere } from "./matiere";
import { Role } from "./role";

export class User {
    id : string;
    _id:string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    role:Role;
    etablissement:Etablissement;
    matiere :Matiere ;
    directeur : User ;
    selected : boolean;
    status:boolean;
    etat:string;
    classe : Classe;
    /*constructor(firstName: string, lastName: string, email: string, phone: number, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }*/
}
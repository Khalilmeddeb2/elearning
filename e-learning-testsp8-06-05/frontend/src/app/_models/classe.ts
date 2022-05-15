import { User } from "./user.model";

export class Classe {
    id : string;
    _id:string;
    nom :string;
    directeur : User;
    enseignant :User;
    selected : boolean =false;
    nbreEtudiants : Number =0 ;

}

import { Classe } from "./classe";
import { User } from "./user.model";

export class Enfant {
    id : string;
    _id:string;
    nom: string;
    prenom :string;
    dateNaissance :Date;
    parent :User;
    numero :number;
    rue :string ;
    ville :string;
    codePostal :number;
    classe:Classe
    
}

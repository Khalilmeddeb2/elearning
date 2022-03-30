import { Classe } from "./classe";
import { Matiere } from "./matiere";
import { User } from "./user.model";

export class Cours {
   

    id : string;
    _id:string;
    nom :string;
    enseignant : User;
    matiere :Matiere;
    classe:Classe
    originalname:string ;
    filename:string ;
    path : string;
    selected : boolean =false;
    nbDownload : number;
    description : string;
    date : Date;
    datebe : string ;
   
    
    
    ////////////////////description :String,

}

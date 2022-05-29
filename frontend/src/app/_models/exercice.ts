import { Classe } from "./classe";
import { Matiere } from "./matiere";
import { Question } from "./question";

export class Exercice {
    id : string;
    _id:string;
    nom: string;
    matiere :Matiere;
    question: Question;
    classe:Classe
    verif :Boolean;
    titre:String;
    temps :Number;
    
}

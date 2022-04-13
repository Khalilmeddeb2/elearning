import { Classe } from "./classe";
import { Matiere } from "./matiere";
import { Question } from "./question";

export class Exercice {
    id : string;
    _id:string;
    nom: string;
    question: Question;
    classe:Classe
    verif :Boolean
    
}

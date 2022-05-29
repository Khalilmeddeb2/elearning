import { Classe } from "./classe";
import { Matiere } from "./matiere";
import { Question } from "./question";

export class Test {

    id : string;
    _id:string;
    nom: string;
    matiere :Matiere;
    dateFin :Date;
    temps :Number;
    question: Question;
    classe:Classe;
    verif :Boolean;
    titre:String;
  dateDebut: Date;
  publie:Boolean;
}

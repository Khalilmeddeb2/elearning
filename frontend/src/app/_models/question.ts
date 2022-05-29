import { Matiere } from "./matiere";

export class Question {
    id : string;
    _id:string;
    nom: string;
    question: string;
    choix :[{numero:number,text:string,selected : boolean  }];
    answer: string;
    matiere :Matiere;
    selected : boolean =false;
   
}

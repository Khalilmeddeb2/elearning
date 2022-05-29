import { Enfant } from "./enfant";
import { User } from "./user.model";

export class ProfilEnfant {
    id : string;
    _id:string;
    enseignant :User;
    enfant : Enfant;
    date :Date;
    datebe : string ;
    description :string;
    originalname:string ;
    filename:string ;
    path : string;
}

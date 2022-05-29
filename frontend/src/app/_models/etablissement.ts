import { Role } from "./role";

export class Etablissement {
    id : string;
    _id:string;
    firstName: string;
    numeroRegister :string;
    pays :string;
    adresse :string;
    telephoneFixe :string;
    siteWeb : string;
    type:string;
    role:Role;
    status:boolean;
    selected : boolean;
    etat:string;
    url:string;
}

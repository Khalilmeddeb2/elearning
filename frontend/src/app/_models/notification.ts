import { Classe } from "./classe";
import { User } from "./user.model";

export class Notification {
    userEnvoie : User ;
    userReception :string;
    message :string;
    date : Date;
    selected :Boolean;
    classeReception :Classe
}

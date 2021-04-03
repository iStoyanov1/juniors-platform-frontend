import { Observable } from "rxjs";
import { Benefit } from "./benefits/benefit";
import { Technology } from "./technologies/technology";

export interface Company{
    urlPath?:string;
    information?:string;
    benefits:Benefit[];
    technologies:Technology[];
}
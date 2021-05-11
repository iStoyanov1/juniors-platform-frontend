import { Observable } from "rxjs";
import { Benefit } from "../models/benefit";
import { Technology } from "../models/technology";

export interface Company{
    urlPath?:string;
    information?:string;
    benefits:Benefit[];
    technologies:Technology[];
    logo?:any
    background?: any;
}
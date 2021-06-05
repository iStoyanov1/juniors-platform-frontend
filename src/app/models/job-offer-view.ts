import { AngularFileUploaderComponent } from "angular-file-uploader";
import { Company } from "./company";
import { Technology } from "./technology";

export interface JobOfferView{
    title:string;
    description:string;
    city:string;
    technologies:Technology[]
    category:any
    isRemoteInterview:Boolean
    workingTime:any
    salary:number
    company: Company
    date:any
    isDeleted:Boolean
}
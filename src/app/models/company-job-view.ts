import { Technology } from "./technology";

export interface CompanyJobView{
   
    title:string;
    description:string
    city:string;
    technologies:Technology[]
    category:any
    isRemoteWorkingInterview:boolean
    workingTime:any
    salary:number


}
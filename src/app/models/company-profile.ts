import { Observable } from "rxjs";
import { Company } from "./company";
import { CompanyContacts } from "./company-contacts";
import { CompanyJobView } from "./company-job-view";
import { CompanyJob } from "./company-jobs";

export interface CompanyProfile{
    name:string
    contacts:CompanyContacts
    description:Company
    jobOffers:CompanyJob[]

}
import { Company } from "./company";
import { Role } from "./role";

export interface Mark {
    id: number;
    name: string;
    subdomain: string;
}

export interface Registration {
    id: number;
    companyId: number;
    roleId: number;
    markId: number;
    userId: number;
    firstname: string;
    lastname: string;
    civility: string;  
    phone: string;
    email: string;
    position: string;
    companyName: string;
    companySiren: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;    
    mark: Mark;
    company: Company;
    role: Role;
    registrationRegions: any[];
    registrationSites: any[];
}

export interface CreateRegistration {
    markId: number;
    firstname: string;
    lastname: string;
    civility: string;  
    phone: string;
    email: string;
    position: string;
    companyName: string;
    companySiren: string;
    password: string;    
}


export interface UpdateRegistration {
    companyId: number;
    roleId: number;
    markId: number;
    firstname: string;
    lastname: string;
    civility: string;  
    phone: string;
    email: string;
    position: string;
    companyName: string;
    companySiren: string;
    regions: number[];
    sites: number[];
}
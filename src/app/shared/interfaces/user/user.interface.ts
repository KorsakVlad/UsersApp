import {Address} from '../address/address.interface';
import {Company} from '../company/company.interface';

export interface User {
    id?: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone?: string;
    website?: string;
    company?: Company;
}


import {Geo} from './get.interface';

export interface Address {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    geo?: Geo;
}

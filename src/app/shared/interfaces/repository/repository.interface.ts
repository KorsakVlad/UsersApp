import {Observable} from 'rxjs';

export interface Repository<T> {
    getAll(): Observable<T[]>;
    getById(id: number): Observable<T>;
    create(object: T): Observable<number>;
    update(id: number, object: T): Observable<T>;
    delete(id: number): void;
}

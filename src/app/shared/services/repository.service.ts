import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Repository} from '../interfaces/repository/repository.interface';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService<T> implements Repository<T> {

    private _endpoint = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) {}

    create(object: T): Observable<number> {
        return this.http.post<number>(this._endpoint, object)
            .pipe((id) => {
                return id;
            });
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this._endpoint)
            .pipe((objects) => {
                return objects;
            });
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this._endpoint}/${id}`)
            .pipe((object) => {
                return object;
            });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this._endpoint}/${id}`);
    }

    update(id: number, object: T): Observable<T> {
        return this.http.put<T>(`${this._endpoint}/${id}`, object)
            .pipe((updateObject) => {
                return updateObject;
            });
    }
}

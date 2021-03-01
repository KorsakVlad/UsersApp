import {Injectable} from '@angular/core';
import {PageName} from '../enums/page-name.enum';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageNameService {

    current$ = new Subject<PageName>();

    constructor() {}

    update(pageName: PageName) {
        this.current$.next(pageName);
    }
}

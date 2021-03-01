import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RouteAddress} from '../../enums/route-address.enum';
import {PageNameService} from '../../services/page-name.service';
import {Subscription} from 'rxjs';
import {PageName} from '../../enums/page-name.enum';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

    currentPageName: PageName;
    pnSub: Subscription;

    constructor(private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pnSub = this.pageNameService.current$.subscribe(pageName => {
            this.currentPageName = pageName;
        });
    }

    public get routeAddress(): typeof RouteAddress {
        return RouteAddress;
    }

    ngOnDestroy(): void {
        if (this.pnSub) {
            this.pnSub.unsubscribe();
        }
    }


}

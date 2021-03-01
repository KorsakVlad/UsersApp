import {Component, OnDestroy, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {User} from '../../shared/interfaces/user/user.interface';
import {Subscription} from 'rxjs';
import {PageNameService} from '../../shared/services/page-name.service';
import {PageName} from '../../shared/enums/page-name.enum';
import {RouteAddress} from '../../shared/enums/route-address.enum';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list-page.component.html',
    styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit, OnDestroy {

    users: User[];
    dSub: Subscription;
    pnSub: Subscription;

    get routeAddress(): typeof RouteAddress {
        return RouteAddress;
    }

    constructor(private repository: RepositoryService<User>, private pageNameService: PageNameService) {}

    ngOnInit() {
        this.repository.getAll()
            .subscribe((users) => {
                this.users = users;
            });

        this.pageNameService.update(PageName.UserList);
    }

    delete(id: number) {
        this.dSub = this.repository.delete(id)
            .subscribe(() => {
                this.users = this.users.filter(u => u.id !== id);
            });
    }

    ngOnDestroy(): void {
        if (this.dSub) {
            this.dSub.unsubscribe();
        }
        if (this.pnSub) {
            this.pnSub.unsubscribe();
        }
    }
}

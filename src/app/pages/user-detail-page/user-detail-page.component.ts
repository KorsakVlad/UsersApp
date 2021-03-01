import {Component, OnDestroy, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {User} from '../../shared/interfaces/user/user.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {RouteAddress} from '../../shared/enums/route-address.enum';
import {PageName} from '../../shared/enums/page-name.enum';
import {PageNameService} from '../../shared/services/page-name.service';
import {FormComponent} from '../../shared/interfaces/component/form-component.interface';

@Component({
    selector: 'app-user-detail-page',
    templateUrl: './user-detail-page.component.html',
    styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit, OnDestroy, FormComponent {

    form: FormGroup;
    isAddMode: boolean;
    user: User;
    userId: number;
    uSub: Subscription;
    submitted = false;

    get routeAddress(): typeof RouteAddress {
        return RouteAddress;
    }

    constructor(private repository: RepositoryService<User>,
                private route: ActivatedRoute, private router: Router,
                private pageNameService: PageNameService) {
    }

    ngOnInit() {
        this.userId = this.route.snapshot.params.id;
        this.isAddMode = !this.userId;

        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required, Validators.minLength(8)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl(''),
            website: new FormControl(''),
            address: new FormGroup({
                street: new FormControl('', [Validators.required]),
                suite: new FormControl(''),
                city: new FormControl('', [Validators.required]),
                zipcode: new FormControl('', [Validators.required]),
                geo: new FormGroup({
                    lat: new FormControl(''),
                    lng: new FormControl('')
                })
            }),
            company: new FormGroup({
                name: new FormControl(''),
                catchPhrase: new FormControl(''),
                bs: new FormControl('')
            })
        });

        if (!this.isAddMode) {
            this.repository.getById(this.userId)
                .subscribe(user => this.form.patchValue(user));
        }

        this.pageNameService.update(this.userId ? PageName.Edit : PageName.Create);
    }

    submit() {
        if (!this.form.valid) {
            return;
        }

        this.submitted = true;
        const user: User = this.geUpdatedUserModel();
        this.uSub = this.getPostSubmitAction(user)
            .subscribe(() => {
                    this.router.navigate(['/', RouteAddress.Users]);
                },
                () => {
                    console.log('fail');
                });
    }


    create(user: User): Observable<number> {
        return this.repository.create(user);
    }

    update(user: User): Observable<User> {
        return this.repository.update(this.userId, user);
    }

    ngOnDestroy(): void {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    private getPostSubmitAction(user: User): Observable<any> {
        return this.userId ? this.update(user) : this.create(user);
    }

    private geUpdatedUserModel(): User {
        return {
            id: this.userId,
            ...this.form.value,
            address: {
                ...this.form.value.address,
                geo: {
                    ...this.form.value.address.geo
                }
            },
            company: {
                ...this.form.value.company
            }
        };
    }
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import {UserDetailPageComponent} from './pages/user-detail-page/user-detail-page.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmLeaveComponent } from './shared/components/confirm-leave/confirm-leave.component';
import {UnsavedChangesGuardService} from './shared/guards/unsaved-changes.guard';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LayoutComponent,
        UserListPageComponent,
        UserDetailPageComponent,
        ConfirmLeaveComponent
    ],
    entryComponents: [
        ConfirmLeaveComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    exports: [
    ],
    providers: [UnsavedChangesGuardService, BsModalRef],
    bootstrap: [AppComponent]
})
export class AppModule {
}

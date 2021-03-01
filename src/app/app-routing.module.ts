import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {UserListPageComponent} from './pages/user-list-page/user-list-page.component';
import {UserDetailPageComponent} from './pages/user-detail-page/user-detail-page.component';
import {RouteAddress} from './shared/enums/route-address.enum';
import {UnsavedChangesGuardService} from './shared/guards/unsaved-changes.guard';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: RouteAddress.Home, pathMatch: 'full'},
      {path: RouteAddress.Home, component: HomePageComponent},
      {path: RouteAddress.Users, component: UserListPageComponent},
      {path: `${RouteAddress.Users}/${RouteAddress.Create}`, component: UserDetailPageComponent, canDeactivate: [UnsavedChangesGuardService]},
      {path: `${RouteAddress.Users}/:id`, component: UserDetailPageComponent, canDeactivate: [UnsavedChangesGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

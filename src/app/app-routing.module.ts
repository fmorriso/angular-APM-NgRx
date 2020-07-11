import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./products/product.module').then(m => m.ProductModule),
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

const routeOptions: ExtraOptions = {enableTracing: false};

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routeOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

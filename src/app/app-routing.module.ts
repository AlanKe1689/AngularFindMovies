import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app.home';
import { AboutComponent } from './app.about';

const routes: Routes = [
  { path: 'home-page', component: HomeComponent },
  { path: 'about-page', component: AboutComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

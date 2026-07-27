import { Routes } from '@angular/router';
import { AlbumDetailComponent } from './components/album-detail/album-detail';
import { CatalogPageComponent } from './components/catalog-page/catalog-page';
import { HomePlaceholderComponent } from './components/home-placeholder/home-placeholder';
import { NotFoundComponent } from './components/not-found/not-found';
import { ProfilePageComponent } from './components/profile-page/profile-page';

export const routes: Routes = [
  { path: '', component: HomePlaceholderComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'music/:id', component: AlbumDetailComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
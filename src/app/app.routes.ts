import { Routes } from '@angular/router';
import { CatalogPageComponent } from './features/catalog/catalog-page/catalog-page';
import { AlbumDetailComponent } from './features/album/album-detail/album-detail';
import { NotFoundComponent } from './features/not-found/not-found/not-found';
import { HomePlaceholderComponent } from './features/home/home-placeholder/home-placeholder';

export const routes: Routes = [
  { path: '', component: HomePlaceholderComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'music/:id', component: AlbumDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

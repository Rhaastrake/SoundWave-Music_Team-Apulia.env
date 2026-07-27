import { Routes } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page';
import { PlaylistPageComponent } from './components/playlist-page/playlist-page';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page';

export const routes: Routes = [
     {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home-page/home-page').then(
        (component) => component.HomePageComponent,
      ),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./components/catalog-page/catalog-page').then(
        (component) => component.CatalogPageComponent,
      ),
  },
  {
    path: 'playlist',
    loadComponent: () =>
      import('./components/playlist-page/playlist-page').then(
        (component) => component.PlaylistPageComponent,
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./components/favorites-page/favorites-page').then(
        (component) => component.FavoritesPageComponent,
      ),
  },
  {
    path: 'booking',
    loadComponent: () =>
      import('./components/booking-page/booking-page').then(
        (component) => component.BookingPageComponent,
      ),
  },
];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home-page/home-page').then(
        (m) => m.HomePageComponent
      ),
  },

  {
    path: 'catalog',
    loadComponent: () =>
      import('./components/catalog-page/catalog-page').then((m) => m.CatalogPageComponent),
  },
  {
    path: 'music/:id',
    loadComponent: () =>
      import('./components/album-detail/album-detail').then((m) => m.AlbumDetailComponent),
  },
  {
    path: 'artist/:id',
    loadComponent: () =>
      import('./components/artist-detail/artist-detail').then((m) => m.ArtistDetailComponent),
  },
  {
    path: 'tickets/:concertId',
    loadComponent: () => import('./components/tickets/tickets').then((m) => m.TicketsComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./components/favorites-page/favorites-page').then((m) => m.FavoritesPageComponent),
  },
  {
    path: 'playlists',
    loadComponent: () =>
      import('./components/playlists-page/playlists-page').then((m) => m.PlaylistsPageComponent),
  },
  {
    path: 'concerts',
    loadComponent: () =>
      import('./components/concert-page/concert-page').then((m) => m.ConcertPageComponent),
  },
  {
    path: 'prenotazioni',
    loadComponent: () =>
      import('./components/booking-page/booking-page').then((m) => m.BookingComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: '/not-found' },
];
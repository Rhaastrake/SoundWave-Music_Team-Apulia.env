import { Routes } from '@angular/router';
import { AlbumDetailComponent } from './components/album-detail/album-detail';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail';
import { CatalogPageComponent } from './components/catalog-page/catalog-page';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page';
import { HomePlaceholderComponent } from './components/home-placeholder/home-placeholder';
import { NotFoundComponent } from './components/not-found/not-found';
import { TicketsComponent } from './components/tickets/tickets';

export const routes: Routes = [
  { path: '', component: HomePlaceholderComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'music/:id', component: AlbumDetailComponent },
  { path: 'artist/:id', component: ArtistDetailComponent },
  { path: 'tickets/:concertId', component: TicketsComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

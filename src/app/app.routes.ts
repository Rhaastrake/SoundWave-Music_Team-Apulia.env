import { Routes } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page';
import { AlbumDetailComponent } from './components/album-detail/album-detail';
import { NotFoundComponent } from './components/not-found/not-found';
import { HomePlaceholderComponent } from './components/home-placeholder/home-placeholder';

export const routes: Routes = [
<<<<<<< Updated upstream
  { path: '', component: HomePlaceholderComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'music/:id', component: AlbumDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
=======
    {
        path: 'catalog', component: CatalogPageComponent
    }
>>>>>>> Stashed changes
];

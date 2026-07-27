import { Component, inject } from '@angular/core';
import { CatalogService } from '../../services/catalog/catalog.service';
import { AlbumCardComponent } from '../album-card/album-card';
import { EmptyStateComponent } from '../empty-state/empty-state';
import { FilterBarComponent } from '../filter-bar/filter-bar';

@Component({
  standalone: true,
  selector: 'app-catalog-page',
  imports: [FilterBarComponent, AlbumCardComponent, EmptyStateComponent],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
})
export class CatalogPageComponent {
  readonly service = inject(CatalogService);
}

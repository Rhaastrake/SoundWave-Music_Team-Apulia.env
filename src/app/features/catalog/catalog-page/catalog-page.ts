import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FilterBarComponent } from '../../../shared/components/filter-bar/filter-bar';
import { AlbumCardComponent } from '../../../shared/components/album-card/album-card';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { CatalogService } from '../../../services/catalog/catalog.service';

@Component({
  standalone: true,
  selector: 'app-catalog-page',
  imports: [FilterBarComponent, AlbumCardComponent, EmptyStateComponent],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
})
export class CatalogPageComponent implements OnInit {
  private readonly meta = inject(Meta);
  readonly service = inject(CatalogService);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'Browse the full album catalog - SoundWave Music' });
  }
}

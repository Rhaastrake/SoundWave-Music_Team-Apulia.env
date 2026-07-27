import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CatalogService } from '../../services/catalog.service';
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
export class CatalogPageComponent implements OnInit {
  private readonly meta = inject(Meta);
  readonly service = inject(CatalogService);

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: 'Browse the full album catalog - SoundWave Music',
    });
  }
}

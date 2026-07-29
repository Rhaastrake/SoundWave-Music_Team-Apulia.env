import { Component, computed, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CatalogService } from '../../services/catalog.service';
import { AlbumCardComponent } from '../album-card/album-card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AlbumCardComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent implements OnInit {
  private readonly meta = inject(Meta);

  readonly catalogService = inject(CatalogService);

  readonly randomAlbums = computed(() => {
    const albums = [...this.catalogService.albums()];

    if (albums.length <= 3) {
      return albums;
    }

    const shuffled = this.shuffleArray(albums);

    return shuffled.slice(0, 3);
  });

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: 'SoundWave Music - Discover albums and tracks',
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

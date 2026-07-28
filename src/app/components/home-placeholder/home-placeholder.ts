import { Component, computed, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CatalogService } from '../../services/catalog.service';
import { AlbumCardComponent } from '../album-card/album-card';

@Component({
  selector: 'app-home-placeholder',
  standalone: true,
  imports: [AlbumCardComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './home-placeholder.html',
  styleUrl: './home-placeholder.scss',
})
export class HomePlaceholderComponent implements OnInit {

  private readonly meta = inject(Meta);

  readonly catalogService = inject(CatalogService);

  readonly randomAlbums = computed(() => {

    const albums = [...this.catalogService.albums()];

    if (albums.length <= 3) {
      return albums;
    }

    const shuffled = albums.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 3);

  });

  ngOnInit(): void {

    this.meta.updateTag({
      name: 'description',
      content: 'SoundWave Music - Discover albums and tracks',
    });

  }

}
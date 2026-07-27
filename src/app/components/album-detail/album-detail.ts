import { Component, computed, effect, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Album } from '../../models';
import { Genre } from '../../enums';
import { CatalogService } from '../../services/catalog.service';
import { FavoritesService } from '../../services/favorites.service';
import { DurationPipe } from '../../pipes/duration';

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Rock]: 'Rock',
  [Genre.Pop]: 'Pop',
  [Genre.Electronic]: 'Elettronica',
  [Genre.Jazz]: 'Jazz',
};

@Component({
  standalone: true,
  selector: 'app-album-detail',
  imports: [RouterLink, DurationPipe],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.scss',
})
export class AlbumDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);
  private readonly meta = inject(Meta);
  protected readonly favoritesService = inject(FavoritesService);

  private readonly id = signal(this.route.snapshot.paramMap.get('id'));

  private resolveAlbum(): Album | null {
    if (!this.catalogService.loaded()) return null;
    const albumId = this.id();
    return albumId ? (this.catalogService.getAlbumById(albumId) ?? null) : null;
  }

  protected readonly album = computed(() => this.resolveAlbum());

  protected readonly loading = computed(() => !this.catalogService.loaded());

  constructor() {
    effect(() => {
      if (!this.catalogService.loaded()) return;
      if (!this.album()) {
        this.router.navigate(['/not-found']);
      }
    });

    effect(() => {
      const a = this.album();
      if (a) {
        this.meta.updateTag({
          name: 'description',
          content: `${a.title} by ${a.artist.name} - SoundWave Music`,
        });
      }
    });
  }

  protected get genreLabel(): string {
    const a = this.album();
    return a ? GENRE_LABELS[a.genre] : '';
  }

  protected get year(): number {
    const a = this.album();
    return a ? a.releaseDate.getFullYear() : 0;
  }

  protected get totalDuration(): number {
    const a = this.album();
    return a ? a.tracks.reduce((sum, t) => sum + t.duration, 0) : 0;
  }
}
import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Artist } from '../../models';
import { Genre, ContentType } from '../../enums';
import { CatalogService } from '../../services/catalog.service';
import { ConcertService } from '../../services/concert.service';
import { EmptyStateComponent } from '../empty-state/empty-state';

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Rock]: 'Rock',
  [Genre.Pop]: 'Pop',
  [Genre.Electronic]: 'Elettronica',
  [Genre.Jazz]: 'Jazz',
};

const TYPE_LABELS: Record<ContentType, string> = {
  [ContentType.Album]: 'Album',
  [ContentType.EP]: 'EP',
  [ContentType.Single]: 'Singolo',
};

@Component({
  standalone: true,
  selector: 'app-artist-detail',
  imports: [RouterLink, EmptyStateComponent, DatePipe, MatButtonModule, MatCardModule],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.scss',
})
export class ArtistDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);
  private readonly concertService = inject(ConcertService);
  private readonly meta = inject(Meta);

  protected readonly id = toSignal(this.route.paramMap.pipe(map(p => p.get('id'))));

  protected readonly artist = computed<Artist | null>(() => {
    if (!this.catalogService.loaded()) return null;
    const id = this.id();
    const found = id ? this.catalogService.getArtistById(id) ?? null : null;
    console.log('[ArtistDetail] computed artist for id:', id, '->', found?.name ?? 'NOT FOUND');
    return found;
  });

  protected readonly loading = computed(() => !this.catalogService.loaded());

  protected readonly sortedAlbums = computed(() => {
    const a = this.artist();
    if (!a) return [];
    return [...a.albums].sort((x, y) => y.releaseDate.getTime() - x.releaseDate.getTime());
  });

  protected readonly upcomingConcerts = computed(() => {
    const artist = this.artist();
    if (!artist || !this.concertService.loaded()) return [];
    return this.concertService.upcomingConcertsByArtist()(artist.id);
  });

  constructor() {
    console.log('[ArtistDetail] CONSTRUCTOR - component created');
    effect(() => {
      const loaded = this.catalogService.loaded();
      const id = this.id();
      const artist = this.artist();
      console.log('[ArtistDetail] effect:', { loaded, id, artist: artist?.name ?? null, artistsCount: this.catalogService.artists().length });
      
      if (!loaded) return;
      if (!artist) {
        console.warn('[ArtistDetail] Artist not found, redirecting to not-found. Available IDs:', this.catalogService.artists().map(a => a.id));
        this.router.navigate(['/not-found']);
      }
    });

    effect(() => {
      const a = this.artist();
      if (a) {
        this.meta.updateTag({
          name: 'description',
          content: `${a.name} - ${a.bio.substring(0, 150)}... - SoundWave Music`,
        });
      }
    });
  }

  protected get genreLabel(): string {
    const a = this.artist();
    return a ? GENRE_LABELS[a.mainGenre] : '';
  }

  protected getAlbumTypeLabel(type: ContentType): string {
    return TYPE_LABELS[type];
  }
}
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Genre } from '../../enums';
import { Artist } from '../../models';
import { BookingService } from '../../services/booking.service';
import { CatalogService } from '../../services/catalog.service';
import { ConcertService } from '../../services/concert.service';
import { AlbumCardComponent } from '../album-card/album-card';
import { EmptyStateComponent } from '../empty-state/empty-state';

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Rock]: 'Rock',
  [Genre.Pop]: 'Pop',
  [Genre.Electronic]: 'Elettronica',
  [Genre.Jazz]: 'Jazz',
};

@Component({
  selector: 'app-artist-detail',
  imports: [
    RouterLink,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    AlbumCardComponent,
    EmptyStateComponent,
  ],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.scss',
})
export class ArtistDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);
  private readonly concertService = inject(ConcertService);
  private readonly bookingService = inject(BookingService);
  private readonly meta = inject(Meta);

  protected readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))));

  protected readonly artist = computed<Artist | null>(() => {
    if (!this.catalogService.loaded()) return null;
    const id = this.id();
    return id ? (this.catalogService.getArtistById(id) ?? null) : null;
  });

  protected readonly loading = computed(() => !this.catalogService.loaded());

  protected readonly genreLabel = computed(() => {
    const a = this.artist();
    return a ? GENRE_LABELS[a.mainGenre] : '';
  });

  protected readonly sortedAlbums = computed(() => {
    const a = this.artist();
    if (!a) return [];
    return [...a.albums].sort((x, y) => y.releaseDate.getTime() - x.releaseDate.getTime());
  });

  protected readonly upcomingConcerts = computed(() => {
    const artist = this.artist();
    if (!artist || !this.concertService.loaded()) return [];
    const concerts = this.concertService.upcomingConcertsByArtist()(artist.id);
    return concerts.map((c) => ({
      ...c,
      availableSeats: this.bookingService.getRemainingSeats(c.id, c.availableSeats),
    }));
  });

  constructor() {
    effect(() => {
      if (!this.catalogService.loaded()) return;
      if (!this.artist()) {
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
}

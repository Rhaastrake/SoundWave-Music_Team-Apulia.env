import { Component, computed, effect, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../empty-state/empty-state';
import { BookingService } from '../../services/booking.service';
import { CatalogService } from '../../services/catalog.service';
import { ConcertService } from '../../services/concert.service';

@Component({
  selector: 'app-concert-page',
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    EmptyStateComponent,
  ],
  templateUrl: './concert-page.html',
  styleUrl: './concert-page.scss',
})
export class ConcertPageComponent {
  private readonly concertService = inject(ConcertService);
  private readonly catalogService = inject(CatalogService);
  private readonly bookingService = inject(BookingService);
  private readonly meta = inject(Meta);

  protected readonly loading = computed(() => !this.concertService.loaded());

  protected readonly concerts = computed(() => {
    if (!this.concertService.loaded()) return [];
    const now = new Date();
    return this.concertService
      .concerts()
      .filter((c) => c.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((c) => ({
        ...c,
        artistName: this.catalogService.getArtistById(c.artistId)?.name ?? 'Artista sconosciuto',
        availableSeats: this.bookingService.getRemainingSeats(c.id, c.availableSeats),
      }));
  });

  constructor() {
    effect(() => {
      this.meta.updateTag({
        name: 'description',
        content: 'Scopri tutti i concerti disponibili - SoundWave Music',
      });
    });
  }
}

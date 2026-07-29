import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Concert } from '../models';

interface RawConcert {
  id: string;
  title: string;
  location: string;
  city: string;
  date: string;
  artistId: string;
  basePrice: number;
  availableSeats: number;
  duration: string;
  trackList: unknown[];
}

@Injectable({ providedIn: 'root' })
export class ConcertService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data/concerts.json';

  readonly concerts: WritableSignal<Concert[]> = signal([]);
  readonly loaded: WritableSignal<boolean> = signal(false);

  readonly upcomingConcertsByArtist = computed(() => {
    const now = new Date();
    return (artistId: string): Concert[] =>
      this.concerts()
        .filter((c: Concert) => c.artistId === artistId && c.date > now)
        .sort((a: Concert, b: Concert) => a.date.getTime() - b.date.getTime());
  });

  constructor() {
    this.http.get<RawConcert[]>(this.dataUrl).subscribe({
      next: (data) => {
        this.build(data);
        this.loaded.set(true);
      },
      error: (err) => {
        this.loaded.set(true);
      },
    });
  }

  private build(data: RawConcert[]): void {
    this.concerts.set(
      data.map((c) => ({
        id: c.id,
        title: c.title,
        location: c.location,
        city: c.city,
        date: new Date(c.date),
        artistId: c.artistId,
        basePrice: c.basePrice,
        availableSeats: c.availableSeats,
        duration: new Date(c.duration),
        trackList: [],
      })),
    );
  }

  getConcertById(id: string): Concert | undefined {
    return this.concerts().find((c: Concert) => c.id === id);
  }
}

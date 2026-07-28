import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Booking } from '../models';

const STORAGE_KEY = 'soundwave.bookings';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly bookings: WritableSignal<Booking[]> = signal(this.restore());

  readonly all = computed(() => this.bookings());
  readonly count = computed(() => this.bookings().length);

  readonly bookedSeatsByConcert = computed(() => {
    const map = new Map<string, number>();
    for (const b of this.bookings()) {
      map.set(b.concertId, (map.get(b.concertId) ?? 0) + b.numberOfSeats);
    }
    return map;
  });

  getRemainingSeats(concertId: string, totalSeats: number): number {
    return totalSeats - (this.bookedSeatsByConcert().get(concertId) ?? 0);
  }

  add(data: Omit<Booking, 'id' | 'bookingDate'>): string {
    const booking: Booking = {
      ...data,
      id: crypto.randomUUID(),
      bookingDate: new Date().toISOString(),
    };
    this.bookings.update((list) => [...list, booking]);
    this.persist();
    return booking.id;
  }

  remove(id: string): void {
    this.bookings.update((list) => list.filter((b) => b.id !== id));
    this.persist();
  }

  clear(): void {
    this.bookings.set([]);
    this.persist();
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookings()));
  }

  private restore(): Booking[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

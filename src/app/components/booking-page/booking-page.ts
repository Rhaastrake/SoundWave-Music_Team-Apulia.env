import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { EmptyStateComponent } from '../empty-state/empty-state';

@Component({
  selector: 'app-booking-page',
  imports: [
    RouterLink,
    EmptyStateComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.scss',
})
export class BookingComponent {
  protected readonly bookingService = inject(BookingService);

  protected readonly loading = computed(() => false);
  protected readonly error = computed(() => false);
  protected readonly isEmpty = computed(() => this.bookingService.all().length === 0);
  protected readonly bookings = computed(() => this.bookingService.all());

  removeBooking(id: string): void {
    this.bookingService.remove(id);
  }
}

import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../../models';
import { BookingService } from '../../services/booking.service';
import { ConcertService } from '../../services/concert.service';
import { ticketValidator } from '../../validators/ticket.validator';

@Component({
  selector: 'app-tickets',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class TicketsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly concertService = inject(ConcertService);
  private readonly bookingService = inject(BookingService);

  concertId = this.route.snapshot.paramMap.get('concertId') ?? '';

  concert?: Concert;

  ticketPrice = 0;

  remainingSeats = 0;

  totalPrice = 0;

  bookingCompleted = false;

  bookingCode = '';

  ticketForm = this.fb.group({
    nome: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
      ],
    ],
    cognome: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(15)]],
    numeroPosti: [1],
  });

  ngOnInit(): void {
    this.concert = this.concertService.getConcertById(this.concertId);

    if (!this.concert) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.ticketPrice = this.concert.basePrice;
    this.totalPrice = this.ticketPrice;

    const booked = this.bookingService.bookedSeatsByConcert().get(this.concertId) ?? 0;
    this.remainingSeats = this.concert.availableSeats - booked;

    this.ticketForm.controls.numeroPosti.setValidators([
      Validators.required,
      ticketValidator(this.remainingSeats),
    ]);
    this.ticketForm.controls.numeroPosti.updateValueAndValidity();

    this.updateTotal();

    this.ticketForm.controls.numeroPosti.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateTotal());
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    this.bookingCode = this.bookingService.add({
      concertId: this.concertId,
      concertTitle: this.concert!.title,
      concertDate: this.concert!.date.toISOString(),
      concertCity: this.concert!.city,
      customerName: this.ticketForm.controls.nome.value!,
      customerSurname: this.ticketForm.controls.cognome.value!,
      customerEmail: this.ticketForm.controls.email.value!,
      numberOfSeats: this.ticketForm.controls.numeroPosti.value!,
      totalPrice: this.totalPrice,
    });

    this.bookingCompleted = true;
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  goToBookings(): void {
    this.router.navigate(['/bookings']);
  }

  protected onlyNumbers(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (allowedKeys.includes(event.key)) return;
    if (event.ctrlKey || event.metaKey) return;
    if (event.key.length === 1 && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  private updateTotal(): void {
    this.totalPrice = Number(this.ticketForm.controls.numeroPosti.value ?? 0) * this.ticketPrice;
  }
}

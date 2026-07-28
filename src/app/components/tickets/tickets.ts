import { CurrencyPipe } from '@angular/common';
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
import { ticketValidator } from '../../validators/ticket.validator';

@Component({
  selector: 'app-tickets',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
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
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  concertId = Number(this.route.snapshot.paramMap.get('concertId'));

  ticketPrice = 20;

  availableSeats = 50;

  bookingCompleted = false;

  bookingCode = '';

  totalPrice = this.ticketPrice;

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
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(15)]],
    numeroPosti: [1, [Validators.required, ticketValidator(this.availableSeats)]],
  });

  ngOnInit(): void {
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

    this.bookingCode = this.generateBookingCode();
    this.bookingCompleted = true;
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  private generateBookingCode(): string {
    return 'BK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  private updateTotal(): void {
    this.totalPrice = Number(this.ticketForm.controls.numeroPosti.value ?? 0) * this.ticketPrice;
  }
}

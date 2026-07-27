import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ticketValidator } from '../../validators/ticket.validator';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class TicketsComponent {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  concertId = Number(this.route.snapshot.paramMap.get('concertId'));

  // TODO: sostituire con il prezzo reale del concerto
  ticketPrice = 20;

  // TODO: sostituire con i posti disponibili reali
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
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
      ]
    ],

    cognome: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]
    ],

    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(15)
      ]
    ],

    numeroPosti: [
      1,
      [
        Validators.required,
        ticketValidator(this.availableSeats)
      ]
    ]

  });

  constructor() {

  this.updateTotal();

  this.ticketForm.get('numeroPosti')?.valueChanges.subscribe(() => {
    this.updateTotal();
  });

}

  onSubmit(): void {

    if (this.ticketForm.invalid) {

      this.ticketForm.markAllAsTouched();

      return;

    }

    this.bookingCode = this.generateBookingCode();

    this.bookingCompleted = true;

  }

  private generateBookingCode(): string {

    return 'BK-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  }

  goToCatalog(): void {

    this.router.navigate(['/catalog']);

  }

  private updateTotal(): void {

    const posti = Number(this.ticketForm.get('numeroPosti')?.value ?? 0);

    this.totalPrice = posti * this.ticketPrice;

  }

}
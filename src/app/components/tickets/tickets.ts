import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  concertId = Number(this.route.snapshot.paramMap.get('concertId'));

  // TODO: sostituire con i posti reali quando sarà disponibile il servizio dei concerti
  availableSeats = 50;

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

  onSubmit(): void {

    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    console.log('Prenotazione:', this.ticketForm.getRawValue());

  }

}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyStateComponent {
  @Input() icon = 'filter_alt_off';
  @Input() message = 'Nessun risultato';
  @Input() hint = 'Prova a modificare i filtri o la ricerca.';
  @Input() actionLabel?: string;
  @Input() actionIcon?: string;
  @Input() actionLink?: string;
  @Output() readonly resetRequest = new EventEmitter<void>();
  @Output() readonly actionClick = new EventEmitter<void>();
}

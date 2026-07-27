import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-empty-state',
  imports: [MatButtonModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyStateComponent {
  @Input() message = 'Nessun risultato';
  @Input() hint = 'Prova a modificare i filtri o la ricerca.';
  @Input() showReset = true;
  @Output() readonly reset = new EventEmitter<void>();
}

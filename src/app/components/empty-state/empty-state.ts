import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-empty-state',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyStateComponent {
  readonly icon = input<string>('search_off');
  readonly message = input<string>('Nessun risultato trovato');
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');

  readonly actionClick = output<void>();
}
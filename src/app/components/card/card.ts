import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly imageUrl = input<string>('');
  readonly badge = input<string>('');
  readonly isFavorite = input<boolean>(false);

  readonly cardClick = output<void>();
  readonly favoriteToggle = output<void>();

  protected onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.favoriteToggle.emit();
  }
}
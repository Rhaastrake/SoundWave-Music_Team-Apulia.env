import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class LoaderComponent {
  readonly label = input<string>('Caricamento in corso…');
  readonly diameter = input<number>(48);
}
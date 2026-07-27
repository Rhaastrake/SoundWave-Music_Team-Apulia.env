import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CatalogPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('SoundWave-Music');
}

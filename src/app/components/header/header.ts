import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);

  readonly isMenuOpen = signal(false);

  readonly menuIcon = computed(() => (this.isMenuOpen() ? 'close' : 'menu'));

  readonly menuLabel = computed(() => (this.isMenuOpen() ? 'Chiudi menu' : 'Apri menu'));

  readonly themeIcon = computed(() => (this.themeService.isDark() ? 'brightness_4' : 'brightness_6'));

  readonly themeLabel = computed(() =>
    this.themeService.isDark() ? 'Passa al tema chiaro' : 'Passa al tema scuro',
  );

  readonly exactMatch = { exact: true };

  toggleMenu(): void {
    this.isMenuOpen.update((prev) => !prev);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
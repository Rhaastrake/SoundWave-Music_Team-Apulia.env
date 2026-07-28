import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { DurationPipe } from '../../pipes';
import { CatalogService } from '../../services/catalog.service';
import { FavoritesService } from '../../services/favorites.service';
import { AlbumCardComponent } from '../album-card/album-card';

@Component({
  selector: 'app-profile-page',
  imports: [
    RouterLink,
    AlbumCardComponent,
    DurationPipe,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePageComponent {
  protected readonly favorites = inject(FavoritesService);
  private readonly catalog = inject(CatalogService);

  protected readonly loading = computed(() => !this.catalog.loaded());

  protected readonly isEmpty = computed(
    () =>
      this.catalog.loaded() &&
      this.favorites.favoriteTracks().length === 0 &&
      this.favorites.favoriteAlbums().length === 0,
  );

  protected readonly totalDuration = computed(() =>
    this.favorites.favoriteTracks().reduce((sum, t) => sum + t.duration, 0),
  );
}

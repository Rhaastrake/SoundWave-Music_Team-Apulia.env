import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Genre } from '../../enums';
import { Album, Track } from '../../models';
import { DurationPipe } from '../../pipes';
import { CatalogService } from '../../services/catalog.service';
import { FavoritesService } from '../../services/favorites.service';
import { PlayerService } from '../../services/player.service';
import { PlaylistService } from '../../services/playlist.service';

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Rock]: 'Rock',
  [Genre.Pop]: 'Pop',
  [Genre.Electronic]: 'Elettronica',
  [Genre.Jazz]: 'Jazz',
};

@Component({
  selector: 'app-album-detail',
  imports: [
    RouterLink,
    DurationPipe,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.scss',
})
export class AlbumDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);
  private readonly meta = inject(Meta);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly favoritesService = inject(FavoritesService);

  protected readonly playlistService = inject(PlaylistService);

  protected readonly playerService = inject(PlayerService);

  private readonly id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  protected readonly album = computed<Album | null>(() => {
    if (!this.catalogService.loaded()) {
      return null;
    }

    const id = this.id();

    if (!id) {
      return null;
    }

    return this.catalogService.getAlbumById(id) ?? null;
  });

  protected readonly loading = computed(() => !this.catalogService.loaded());

  protected readonly genreLabel = computed(() => {
    const album = this.album();

    return album ? GENRE_LABELS[album.genre] : '';
  });

  protected readonly year = computed(() => {
    const album = this.album();

    return album ? album.releaseDate.getFullYear() : 0;
  });

  protected readonly totalDuration = computed(() => {
    const album = this.album();

    if (!album) {
      return 0;
    }

    return album.tracks.reduce((total, track) => total + track.duration, 0);
  });

  constructor() {
    effect(() => {
      if (!this.catalogService.loaded()) {
        return;
      }

      if (!this.album()) {
        this.router.navigate(['/not-found']);
      }
    });

    effect(() => {
      const album = this.album();

      if (!album) {
        return;
      }

      this.meta.updateTag({
        name: 'description',
        content: `${album.title} di ` + `${album.artist.name} - SoundWave Music`,
      });
    });
  }

  protected toggleTrackFavorite(track: Track): void {
    const wasFavorite = this.favoritesService.isFavorite(track.id);

    this.favoritesService.toggleFavorite(track.id);

    this.snackBar.open(
      wasFavorite
        ? `"${track.title}" rimosso dai preferiti`
        : `"${track.title}" aggiunto ai preferiti`,
      'Chiudi',
      {
        duration: 2500,
      },
    );
  }

  protected addTrackToPlaylist(playlistId: string, playlistTitle: string, track: Track): void {
    const added = this.playlistService.addTrack(playlistId, track);

    if (added) {
      this.snackBar.open(`"${track.title}" aggiunto a "${playlistTitle}"`, 'Chiudi', {
        duration: 2500,
      });

      return;
    }

    this.snackBar.open(`"${track.title}" è già presente in "${playlistTitle}"`, 'Chiudi', {
      duration: 3000,
    });
  }

  protected isCurrentTrack(track: Track): boolean {
    return this.playerService.currentTrack()?.id === track.id;
  }

  protected playOrPauseTrack(track: Track, queue: Track[]): void {
    if (this.isCurrentTrack(track)) {
      this.playerService.togglePlay();
    } else {
      this.playerService.playTrack(track, queue);
    }
  }
}


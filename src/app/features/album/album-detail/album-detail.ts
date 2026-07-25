import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Album } from '../../../core/models';
import { Genre } from '../../../core/enums';
import { CatalogService } from '../../../services/catalog/catalog.service';
import { FavoritesService } from '../../../services/favorites/favorites.service';
import { DurationPipe } from '../../../shared/pipes/duration/duration';

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Rock]: 'Rock',
  [Genre.Pop]: 'Pop',
  [Genre.Electronic]: 'Elettronica',
  [Genre.Jazz]: 'Jazz',
};

@Component({
  standalone: true,
  selector: 'app-album-detail',
  imports: [RouterLink, DurationPipe],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.scss',
})
export class AlbumDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);
  private readonly meta = inject(Meta);
  protected readonly favoritesService = inject(FavoritesService);

  protected album: Album | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    const found = this.catalogService.getAlbumById(id);
    if (!found) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.album = found;
    this.meta.updateTag({ name: 'description', content: `${found.title} by ${found.artist.name} - SoundWave Music` });
  }

  protected get genreLabel(): string {
    return this.album ? GENRE_LABELS[this.album.genre] : '';
  }

  protected get year(): number {
    return this.album ? this.album.releaseDate.getFullYear() : 0;
  }

  protected get totalDuration(): number {
    return this.album ? this.album.tracks.reduce((sum, t) => sum + t.duration, 0) : 0;
  }
}

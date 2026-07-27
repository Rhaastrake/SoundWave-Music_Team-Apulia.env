import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentType, Genre } from '../../enums';
import { Album } from '../../models';

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Rock]: 'Rock',
  [Genre.Pop]: 'Pop',
  [Genre.Electronic]: 'Elettronica',
  [Genre.Jazz]: 'Jazz',
};

const TYPE_LABELS: Record<ContentType, string> = {
  [ContentType.Single]: 'Singolo',
  [ContentType.EP]: 'EP',
  [ContentType.Album]: 'Album',
};

@Component({
  standalone: true,
  selector: 'app-album-card',
  imports: [RouterLink],
  templateUrl: './album-card.html',
  styleUrl: './album-card.scss',
})
export class AlbumCardComponent {
  readonly album = input.required<Album>();

  protected get genreLabel(): string {
    return GENRE_LABELS[this.album().genre];
  }

  protected get typeLabel(): string {
    return TYPE_LABELS[this.album().type];
  }

  protected get year(): number {
    return this.album().releaseDate.getFullYear();
  }
}

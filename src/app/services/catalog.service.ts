import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { ContentType, Genre } from '../enums';
import { Album } from '../models';
import { MOCK_ALBUMS } from './mock-albums';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly albums: WritableSignal<Album[]> = signal(MOCK_ALBUMS);
  readonly searchText: WritableSignal<string> = signal('');
  readonly selectedGenres: WritableSignal<Genre[]> = signal([]);
  readonly selectedYear: WritableSignal<number | null> = signal(null);
  readonly selectedContentTypes: WritableSignal<ContentType[]> = signal([]);

  readonly filteredAlbums = computed(() => {
    const text = this.searchText().toLowerCase().trim();
    const genres = this.selectedGenres();
    const year = this.selectedYear();
    const types = this.selectedContentTypes();

    return this.albums().filter((album) => {
      if (text && !this.matchesSearch(album, text)) return false;
      if (genres.length && !genres.includes(album.genre)) return false;
      if (year !== null && album.releaseDate.getFullYear() !== year) return false;
      if (types.length && !types.includes(album.type)) return false;
      return true;
    });
  });

  readonly resultCount = computed(() => this.filteredAlbums().length);

  private matchesSearch(album: Album, text: string): boolean {
    const titleMatch = album.title.toLowerCase().includes(text);
    const artistMatch = album.artist.name.toLowerCase().includes(text);
    const genreMatch = Genre[album.genre].toLowerCase().includes(text);
    return titleMatch || artistMatch || genreMatch;
  }

  setGenre(genres: Genre[]): void {
    this.selectedGenres.set(genres);
  }

  setYear(year: number | null): void {
    this.selectedYear.set(year);
  }

  setContentType(types: ContentType[]): void {
    this.selectedContentTypes.set(types);
  }

  setSearchText(text: string): void {
    this.searchText.set(text);
  }

  getAlbumById(id: string): Album | undefined {
    return this.albums().find(a => a.id === id);
  }

  resetFilters(): void {
    this.searchText.set('');
    this.selectedGenres.set([]);
    this.selectedYear.set(null);
    this.selectedContentTypes.set([]);
  }
}

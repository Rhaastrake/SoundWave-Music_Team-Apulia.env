import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { ContentType, Genre } from '../enums';
import { Album, Artist, Track } from '../models';

interface RawArtist {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  mainGenre: keyof typeof Genre;
  formationYear: number;
}
interface RawTrack {
  id: string;
  title: string;
  duration: number;
  genre: keyof typeof Genre;
  artistIds: string[];
}
interface RawRelease {
  id: string;
  title: string;
  type: keyof typeof ContentType;
  genre: keyof typeof Genre;
  imageUrl: string;
  releaseDate: string;
  artistId: string;
  trackIds: string[];
}
interface CatalogData {
  artists: RawArtist[];
  tracks: RawTrack[];
  releases: RawRelease[];
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data/albums.json';

  readonly albums: WritableSignal<Album[]> = signal([]);
  readonly artists: WritableSignal<Artist[]> = signal([]);
  readonly loaded: WritableSignal<boolean> = signal(false);

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

  constructor() {
    console.log('[CatalogService] Constructor - starting data load from', this.dataUrl);
    this.http.get<CatalogData>(this.dataUrl).subscribe({
      next: (data) => {
        console.log('[CatalogService] Data loaded:', { artists: data.artists.length, tracks: data.tracks.length, releases: data.releases.length });
        this.build(data);
        this.loaded.set(true);
        console.log('[CatalogService] Build complete, loaded=true');
      },
      error: (err) => {
        console.error('[CatalogService] Caricamento catalogo fallito', err);
        this.loaded.set(true);
      },
    });
  }

  private build(data: CatalogData): void {
    const artistMap = new Map<string, Artist>();
    data.artists.forEach((a) =>
      artistMap.set(a.id, {
        id: a.id,
        name: a.name,
        imageUrl: a.imageUrl,
        bio: a.bio,
        mainGenre: Genre[a.mainGenre],
        formationYear: a.formationYear,
        albums: [],
      }),
    );

    const trackMap = new Map<string, Track>();
    data.tracks.forEach((t) =>
      trackMap.set(t.id, {
        id: t.id,
        title: t.title,
        duration: t.duration,
        genre: Genre[t.genre],
        artists: t.artistIds.map((id) => artistMap.get(id)!),
      }),
    );

    const albums = data.releases.map((raw) => {
      const artist = artistMap.get(raw.artistId)!;
      const album: Album = {
        id: raw.id,
        title: raw.title,
        type: ContentType[raw.type],
        genre: Genre[raw.genre],
        imageUrl: raw.imageUrl,
        releaseDate: new Date(raw.releaseDate),
        artist,
        tracks: raw.trackIds.map((id) => trackMap.get(id)!),
      };
      artist.albums.push(album);
      return album;
    });

    this.artists.set([...artistMap.values()]);
    this.albums.set(albums);
    console.log('[CatalogService] Artists set:', this.artists().map(a => a.id));
  }

  private matchesSearch(album: Album, text: string): boolean {
    const titleMatch = album.title.toLowerCase().includes(text);
    const artistMatch = album.artist.name.toLowerCase().includes(text);
    const genreMatch = Genre[album.genre].toLowerCase().includes(text);
    return titleMatch || artistMatch || genreMatch;
  }

  getAlbumById(id: string): Album | undefined {
    return this.albums().find((a) => a.id === id);
  }

  getArtistById(id: string): Artist | undefined {
    return this.artists().find((a) => a.id === id);
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
  resetFilters(): void {
    this.searchText.set('');
    this.selectedGenres.set([]);
    this.selectedYear.set(null);
    this.selectedContentTypes.set([]);
  }
}
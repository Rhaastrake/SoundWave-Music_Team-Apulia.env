import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { Album, Track } from '../models';
import { FavoriteCardItem } from '../models/favorite-view.model';
import { CatalogService } from './catalog.service';

const STORAGE_KEY = 'soundwave.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly catalog = inject(CatalogService);

  private readonly favoriteIds: WritableSignal<Set<string>> = signal(this.restore());

  readonly favoritesCount = computed(() => this.favoriteIds().size);

  /** Album preferiti "grezzi" — utile per il dettaglio (DEV-C). */
  readonly favoriteAlbums = computed<Album[]>(() => {
    const ids = this.favoriteIds();
    return this.catalog.albums().filter((a) => ids.has(a.id));
  });

  /** Brani preferiti "grezzi", con riferimento all'album padre per l'imageUrl. */
  readonly favoriteTracks = computed<{ track: Track; album: Album }[]>(() => {
    const ids = this.favoriteIds();
    return this.catalog.albums()
      .flatMap((album) => album.tracks.map((track) => ({ track, album })))
      .filter(({ track }) => ids.has(track.id));
  });

  /** View model unico e normalizzato, pronto per CardComponent in /favorites. */
  readonly favoriteCardItems = computed<FavoriteCardItem[]>(() => [
    ...this.favoriteAlbums().map((a): FavoriteCardItem => ({
      id: a.id,
      type: a.type,
      title: a.title,
      imageUrl: a.imageUrl,
      subtitle: a.artist.name,
    })),
    ...this.favoriteTracks().map(({ track, album }): FavoriteCardItem => ({
      id: track.id,
      type: album.type, // o un valore fisso 'track' se l'enum lo prevede
      title: track.title,
      imageUrl: album.imageUrl, // ereditata dall'album
      subtitle: track.artists.map((a) => a.name).join(', '),
    })),
  ]);

  constructor() {
    effect(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...this.favoriteIds()]));
    });
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  toggleFavorite(id: string): void {
    this.favoriteIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  getFavorites(): FavoriteCardItem[] {
    return this.favoriteCardItems();
  }

  clear(): void {
    this.favoriteIds.set(new Set());
  }

  private restore(): Set<string> {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }
}
import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { Album, Track } from '../models';
import { CatalogService } from './catalog.service';

const STORAGE_KEY = 'soundwave.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly catalog = inject(CatalogService);

  private readonly favoriteIds: WritableSignal<Set<string>> = signal(this.restore());

  readonly favoritesCount = computed(() => this.favoriteIds().size);

  readonly favoriteAlbums = computed<Album[]>(() => {
    const ids = this.favoriteIds();
    return this.catalog.albums().filter((a) => {
      if (!ids.has(a.id)) return false;
      return a.tracks.some((t) => ids.has(t.id));
    });
  });

  readonly favoriteTracks = computed<Track[]>(() => {
    const ids = this.favoriteIds();
    return this.catalog.tracks().filter((t) => ids.has(t.id));
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.favoriteIds()]));
    });
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  toggleFavorite(id: string): void {
    this.favoriteIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
        for (const album of this.catalog.albums()) {
          if (next.has(album.id) && album.tracks.some((t) => t.id === id)) {
            if (!album.tracks.some((t) => next.has(t.id))) {
              next.delete(album.id);
            }
          }
        }
      } else {
        next.add(id);
      }
      return next;
    });
  }

  toggleAlbumFavorite(album: Album): void {
    this.favoriteIds.update((set) => {
      const next = new Set(set);
      const trackIds = album.tracks.map((t) => t.id);

      if (next.has(album.id)) {
        next.delete(album.id);
        trackIds.forEach((id) => next.delete(id));
      } else {
        next.add(album.id);
        trackIds.forEach((id) => next.add(id));
      }

      return next;
    });
  }

  clear(): void {
    this.favoriteIds.set(new Set());
  }

  private restore(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }
}

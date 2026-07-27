import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { Album, Track } from '../models';
import { CatalogService } from './catalog.service';

const STORAGE_KEY = 'soundwave.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly catalog = inject(CatalogService);

  private readonly favoriteIds: WritableSignal<Set<string>> = signal(this.restore());

  readonly favoritesCount = computed(() => this.favoriteIds().size);

  /** Release preferite risolte in Album veri; vuoto finché il catalogo non ha caricato. */
  readonly favoriteAlbums = computed<Album[]>(() => {
    const ids = this.favoriteIds();
    return this.catalog.albums().filter((a) => ids.has(a.id));
  });

  /** Brani preferiti risolti in Track veri; vuoto finché il catalogo non ha caricato. */
  readonly favoriteTracks = computed<Track[]>(() => {
    const ids = this.favoriteIds();
    return this.catalog.tracks().filter((t) => ids.has(t.id));
  });

  constructor() {
    // Salva a ogni modifica
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
      if (next.has(id)) next.delete(id);
      else next.add(id);
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
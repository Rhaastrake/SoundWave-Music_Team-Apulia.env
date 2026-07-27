import { Injectable, computed, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _favoriteIds = signal<Set<string>>(new Set());

  readonly count = computed(() => this._favoriteIds().size);

  isFavorite(id: string): boolean {
    return this._favoriteIds().has(id);
  }

  toggle(id: string): void {
    this._favoriteIds.update((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
}
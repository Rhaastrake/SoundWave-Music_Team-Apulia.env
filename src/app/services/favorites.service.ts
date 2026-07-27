import { Injectable, WritableSignal, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private readonly favoriteIds: WritableSignal<Set<string>> = signal(new Set());

  readonly favoritesCount = computed(() => this.favoriteIds().size);

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  toggleFavorite(id: string): void {
    this.favoriteIds.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
}

import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Playlist, Track } from '../models';

@Injectable({ providedIn: 'root'})
export class PlaylistService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'soundwave-playlists';
  private readonly playlistState = signal<Playlist[]>(this.loadPlaylists());
  readonly playlists = this.playlistState.asReadonly();
  private nextId = 1;

  constructor() {
    effect(() => {
      this.savePlaylists(this.playlistState());
    });
  }

  isNameTaken(title: string): boolean {
    const normalizedTitle = this.normalizeTitle(title);

    return this.playlistState().some(
      (playlist) => this.normalizeTitle(playlist.title) === normalizedTitle,
    );
  }

  createPlaylist(title: string): Playlist | null {
    const cleanTitle = title.trim();

    if (!cleanTitle || this.isNameTaken(cleanTitle)) {
      return null;
    }

    const playlist: Playlist = {
      id: `playlist-${Date.now()}-` + `${this.nextId++}`,
      title: cleanTitle,
      imageUrl: '',
      tracks: [],
    };

    this.playlistState.update((playlists) => [...playlists, playlist]);

    return playlist;
  }

  deletePlaylist(playlistId: string): boolean {
    const playlistExists = this.playlistState().some((playlist) => playlist.id === playlistId);

    if (!playlistExists) {
      return false;
    }

    this.playlistState.update((playlists) =>
      playlists.filter((playlist) => playlist.id !== playlistId),
    );

    return true;
  }

  addTrack(playlistId: string, track: Track): boolean {
    const playlist = this.playlistState().find((item) => item.id === playlistId);

    if (!playlist) {
      return false;
    }

    const trackAlreadyExists = playlist.tracks.some(
      (playlistTrack) => playlistTrack.id === track.id,
    );

    if (trackAlreadyExists) {
      return false;
    }

    /*
     * Creiamo una copia sicura del brano.
     *
     * Gli artisti originali contengono gli album e
     * gli album contengono nuovamente i brani.
     * Questo causerebbe un riferimento circolare
     * durante JSON.stringify().
     */
    const safeTrack = this.createSafeTrack(track);

    this.playlistState.update((playlists) =>
      playlists.map((item) =>
        item.id === playlistId
          ? {
              ...item,
              tracks: [...item.tracks, safeTrack],
            }
          : item,
      ),
    );

    return true;
  }

  removeTrack(playlistId: string, trackId: string): boolean {
    const playlist = this.playlistState().find((item) => item.id === playlistId);

    if (!playlist) {
      return false;
    }

    const trackExists = playlist.tracks.some((track) => track.id === trackId);

    if (!trackExists) {
      return false;
    }

    this.playlistState.update((playlists) =>
      playlists.map((item) =>
        item.id === playlistId
          ? {
              ...item,
              tracks: item.tracks.filter((track) => track.id !== trackId),
            }
          : item,
      ),
    );

    return true;
  }

  getTotalDuration(playlist: Playlist): number {
    return playlist.tracks.reduce((total, track) => total + track.duration, 0);
  }

  private createSafeTrack(track: Track): Track {
    return {
      id: track.id,
      title: track.title,
      duration: track.duration,
      genre: track.genre,

      /*
       * Manteniamo i dati degli artisti necessari
       * alla visualizzazione, ma svuotiamo albums
       * per eliminare il riferimento circolare.
       */
      artists: track.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        imageUrl: artist.imageUrl,
        bio: artist.bio,
        mainGenre: artist.mainGenre,
        formationYear: artist.formationYear,
        albums: [],
      })),
    };
  }

  private loadPlaylists(): Playlist[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    try {
      const savedPlaylists = localStorage.getItem(this.storageKey);

      if (!savedPlaylists) {
        return [];
      }

      const parsedPlaylists: unknown = JSON.parse(savedPlaylists);

      if (!Array.isArray(parsedPlaylists)) {
        return [];
      }

      return parsedPlaylists as Playlist[];
    } catch (error) {
      console.error('Errore durante il caricamento delle playlist:', error);

      return [];
    }
  }

  private savePlaylists(playlists: Playlist[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(playlists));
    } catch (error) {
      console.error('Errore durante il salvataggio delle playlist:', error);
    }
  }

  private normalizeTitle(title: string): string {
    return title.trim().toLocaleLowerCase('it-IT');
  }
}

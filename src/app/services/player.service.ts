import { Injectable, signal } from '@angular/core';
import { Track } from '../models';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly currentTrack = signal<Track | null>(null);
  private readonly isPlaying = signal(false);
  private readonly currentTime = signal(0);
}

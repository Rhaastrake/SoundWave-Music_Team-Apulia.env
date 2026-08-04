import { computed, effect, Injectable, signal } from '@angular/core';
import { Track } from '../models';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly currentTrackState = signal<Track | null>(null);
  private readonly isPlayingState = signal(false);
  private readonly currentTimeState = signal(0);
  private readonly queueState = signal<Track[]>([]);

  readonly currentTrack = this.currentTrackState.asReadonly();
  readonly isPlaying = this.isPlayingState.asReadonly();
  readonly currentTime = this.currentTimeState.asReadonly();
  readonly queue = this.queueState.asReadonly();

  readonly trackDuration = computed(() => this.currentTrack()?.duration ?? 0);

  readonly currentProgress = computed(() => {
    const duration = this.trackDuration();
    if (duration <= 0) return 0;
    return Math.min((this.currentTime() / duration) * 100, 100);
  });

  readonly currentIndex = computed(() =>
    this.queue().findIndex((t) => t.id === this.currentTrack()?.id),
  );

  readonly hasPrevious = computed(() => this.currentIndex() > 0);

  readonly hasNext = computed(() => {
    const index = this.currentIndex();
    return index >= 0 && index < this.queue().length - 1;
  });

  constructor() {
    effect((onCleanup) => {
      if (!this.isPlayingState()) return;

      const intervalId = setInterval(() => this.tick(), 1000);

      onCleanup(() => clearInterval(intervalId));
    });
  }

  playTrack(track: Track, queue: Track[] = []): void {
    const nextQueue = queue.length ? queue : [track];

    this.queueState.set(nextQueue);
    this.currentTrackState.set(track);
    this.currentTimeState.set(0);
    this.isPlayingState.set(true);
  }

  togglePlay(): void {
    if (!this.currentTrackState()) return;
    this.isPlayingState.update((playing) => !playing);
  }

  pause(): void {
    this.isPlayingState.set(false);
  }

  resume(): void {
    if (this.currentTrackState()) {
      this.isPlayingState.set(true);
    }
  }

  stop(): void {
    this.isPlayingState.set(false);
    this.currentTimeState.set(0);
  }

  seek(seconds: number | null): void {
    if (seconds === null) return;

    const clamped = Math.min(Math.max(seconds, 0), this.trackDuration());
    this.currentTimeState.set(clamped);
  }

  next(): void {
    const index = this.currentIndex();
    if (index < 0 || index >= this.queue().length - 1) return;

    const next = this.queueState()[index + 1];
    this.playTrack(next, this.queueState());
  }

  previous(): void {
    const index = this.currentIndex();
    if (index < 0) return;

    if (this.currentTimeState() > 3) {
      this.currentTimeState.set(0);
      return;
    }

    if (index === 0) {
      this.currentTimeState.set(0);
      return;
    }

    const prev = this.queueState()[index - 1];
    this.playTrack(prev, this.queueState());
  }

  private tick(): void {
  const track = this.currentTrackState();
  if (!track) {
    this.isPlayingState.set(false);
    return;
  }

  const nextTime = this.currentTimeState() + 1;

  if (nextTime < track.duration) {
    this.currentTimeState.set(nextTime);
    return;
  }
  
  const index = this.currentIndex();
  const next = this.queueState()[index + 1];

  if (next) {
    this.playTrack(next, this.queueState());
  } else {
    this.currentTimeState.set(track.duration);
    this.isPlayingState.set(false);
  }
}
}

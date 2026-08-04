import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { DurationPipe } from '../../pipes';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-mini-player',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    DurationPipe
  ],
  templateUrl: './mini-player.html',
  styleUrl: './mini-player.scss',
})
export class MiniPlayerComponent {
  protected readonly player = inject(PlayerService);

  protected readonly trackArtists = computed(() => 
  this.player.currentTrack()?.artists.map((a) => a.name).join(', ') ?? '', );

  protected onSeek(value: number): void {
    this.player.seek(value);
  }
}

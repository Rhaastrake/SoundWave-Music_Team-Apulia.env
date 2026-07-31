import { Component, inject } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.html',
  styleUrl: './mini-player.scss',
})
export class MiniPlayerComponent {
  protected readonly player = inject(PlayerService);
}

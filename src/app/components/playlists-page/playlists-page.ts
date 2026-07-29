import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Playlist } from '../../models';
import { DurationPipe } from '../../pipes';
import { PlaylistService } from '../../services/playlist.service';
import { EmptyStateComponent } from '../empty-state/empty-state';

@Component({
  selector: 'app-playlists-page',
  imports: [
    ReactiveFormsModule,
    DurationPipe,
    EmptyStateComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
  ],
  templateUrl: './playlists-page.html',
  styleUrl: './playlists-page.scss',
})
export class PlaylistsPageComponent {
  protected readonly playlistService = inject(PlaylistService);

  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly playlistForm = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        (control) =>
          this.playlistService.isNameTaken(control.value) ? { duplicateName: true } : null,
      ],
    ],
  });

  protected createPlaylist(): void {
    if (this.playlistForm.invalid) {
      this.playlistForm.markAllAsTouched();
      return;
    }

    const playlist = this.playlistService.createPlaylist(this.playlistForm.controls.name.value);

    if (!playlist) {
      this.playlistForm.controls.name.setErrors({
        duplicateName: true,
      });

      return;
    }

    this.playlistForm.reset();

    this.snackBar.open(`Playlist "${playlist.title}" creata.`, 'Chiudi', {
      duration: 2500,
    });
  }

  protected deletePlaylist(playlist: Playlist): void {
    const confirmed = window.confirm(`Vuoi eliminare la playlist "${playlist.title}"?`);

    if (!confirmed) {
      return;
    }

    this.playlistService.deletePlaylist(playlist.id);

    this.playlistForm.controls.name.updateValueAndValidity();

    this.snackBar.open(`Playlist "${playlist.title}" eliminata.`, 'Chiudi', {
      duration: 2500,
    });
  }

  protected removeTrack(playlist: Playlist, trackId: string, trackTitle: string): void {
    const removed = this.playlistService.removeTrack(playlist.id, trackId);

    if (removed) {
      this.snackBar.open(`"${trackTitle}" rimosso dalla playlist.`, 'Chiudi', {
        duration: 2500,
      });
    }
  }

  protected totalDuration(playlist: Playlist): number {
    return this.playlistService.getTotalDuration(playlist);
  }
}

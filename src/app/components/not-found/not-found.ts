import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent implements OnInit {
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'Page not found - SoundWave Music' });
  }
}

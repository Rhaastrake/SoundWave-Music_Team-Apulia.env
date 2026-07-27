import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  readonly links = [
    {
      path: '/catalog',
      label: 'Catalogo',
      icon: 'library_music',
    },
    {
      path: '/booking',
      label: 'Concerti',
      icon: 'confirmation_number',
    },
    {
      path: '/playlist',
      label: 'Playlist',
      icon: 'queue_music',
    },
    {
      path: '/favorites',
      label: 'Preferiti',
      icon: 'favorite',
    },
  ];
}
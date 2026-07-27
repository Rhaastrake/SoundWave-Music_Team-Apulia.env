import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TeamMember } from '../../models/Team-member';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly projectName = 'SoundWave Music';
  readonly currentYear = new Date().getFullYear();

  readonly teamMembers: readonly TeamMember[] = [
    { name: 'Cristian Losito' },
    { name: 'Davide Barbieri' },
    { name: 'Michele Garofalo' },
    { name: 'Federico Di Leo' },
    { name: 'Giuseppe Calabrese' },
  ];
}
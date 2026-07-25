import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-home-placeholder',
  template: '',
})
export class HomePlaceholderComponent implements OnInit {
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'SoundWave Music - Discover albums and tracks' });
  }
}

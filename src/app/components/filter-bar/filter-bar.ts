import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContentType, Genre } from '../../enums';
import { CatalogService } from '../../services/catalog/catalog.service';

interface SelectOption<T> {
  value: T;
  label: string;
}

@Component({
  standalone: true,
  selector: 'app-filter-bar',
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
})
export class FilterBarComponent {
  readonly service = inject(CatalogService);

  readonly genres: SelectOption<Genre>[] = [
    { value: Genre.Rock, label: 'Rock' },
    { value: Genre.Pop, label: 'Pop' },
    { value: Genre.Electronic, label: 'Elettronica' },
    { value: Genre.Jazz, label: 'Jazz' },
  ];

  readonly contentTypes: SelectOption<ContentType>[] = [
    { value: ContentType.Single, label: 'Singolo' },
    { value: ContentType.EP, label: 'EP' },
    { value: ContentType.Album, label: 'Album' },
  ];

  onYearInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.service.setYear(input.value ? +input.value : null);
  }

  onYearKeydown(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === '+') {
      event.preventDefault();
    }
  }
}

import { Genre } from '../enums';
import { Artist } from './artist';
import { WithId } from './with-id';

export interface Track extends WithId {
  title: string;
  duration: number;
  genre: Genre;
  artists: Artist[];
}

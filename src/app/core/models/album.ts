import { ContentType, Genre } from '../enums';
import { Artist } from './artist';
import { Track } from './track';
import { WithId } from './with-id';

export interface Album extends WithId {
  title: string;
  type: ContentType;
  artist: Artist;
  genre: Genre;
  imageUrl: string;
  releaseDate: Date;
  tracks: Track[];
}

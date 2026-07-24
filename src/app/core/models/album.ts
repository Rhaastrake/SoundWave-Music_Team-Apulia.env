import { ContentType } from '../enums';
import { Artist } from './artist';
import { Track } from './track';
import { WithId } from './with-id';

export interface Album extends WithId {
  title: string;
  type: ContentType;
  artist: Artist;
  imageUrl: string;
  releaseDate: Date;
  tracks: Track[];
}

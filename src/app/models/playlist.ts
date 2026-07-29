import { Track } from './track';
import { WithId } from './with-id';

export interface Playlist extends WithId {
  title: string;
  imageUrl: string;
  tracks: Track[];
}

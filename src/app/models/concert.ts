import { Track } from './track';
import { WithId } from './with-id';

export interface Concert extends WithId {
  title: string;
  location: string;
  city: string;
  date: Date;
  duration: Date;
  trackList: Track[];
}

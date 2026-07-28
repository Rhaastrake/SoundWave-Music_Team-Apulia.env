import { Track } from './track';
import { WithId } from './with-id';

export interface Concert extends WithId {
  title: string;
  location: string;
  city: string;
  date: Date;
  artistId: string;
  basePrice: number;
  availableSeats: number;
  duration: Date;
  trackList: Track[];
}

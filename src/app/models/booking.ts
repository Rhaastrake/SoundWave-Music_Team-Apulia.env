import { Ticket } from './ticket';
import { WithId } from './with-id';

export interface Booking extends WithId {
  tickets: Ticket[];
}

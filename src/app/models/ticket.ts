import { Concert } from './concert';
import { WithId } from './with-id';

export interface Ticket extends WithId {
  concert: Concert;
  price: number;
  isAvailable: boolean;
  isDigital: boolean;
}

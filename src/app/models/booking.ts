import { WithId } from './with-id';

export interface Booking extends WithId {
  concertId: string;
  concertTitle: string;
  concertDate: string;
  concertCity: string;
  customerName: string;
  customerSurname: string;
  customerEmail: string;
  numberOfSeats: number;
  totalPrice: number;
  bookingDate: string;
}

export interface BookingForm {
  name: string;
  email: string;
  date: string;
  time: string;
}

export interface Booking extends BookingForm {
  id: string
  serviceId: string;
}
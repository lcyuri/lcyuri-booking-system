import { Booking, BookingForm } from "@/types/Booking";
import { Center } from "@/types/Center";
import { Service } from "@/types/Service";

export async function getCenterInfoById(centerId: string): Promise<Center> {
  return new Promise<Center>((resolve, reject) => {
    setTimeout(() => {
      fetch(`/api/${centerId}-info.json`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          return res.json();
        })
        .then((data: Center) => {
          const fail = Math.random() < 0.1; // 10% chance of failure

          if (fail) {
            reject(new Error("Simulated server error"));
            return;
          }

          resolve(data);
        })
        .catch(err => reject(err));
    }, 1000); // simulate 1s network delay
  });
}

export async function getServicesByCenterId(centerId: string): Promise<Service[]> {
  return new Promise<Service[]>((resolve, reject) => {
    setTimeout(() => {
      fetch(`/api/${centerId}-services.json`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          return res.json();
        })
        .then((data: Service[]) => {
          const fail = Math.random() < 0.1;

          if (fail) {
            reject(new Error("Simulated server error"));
            return;
          }

          resolve(data);
        })
        .catch(err => reject(err));
    }, 1000);
  });
}

export async function getBookingsByCenterId(centerId: string): Promise<Booking[]> {
  return new Promise<Booking[]>((resolve, reject) => {
    setTimeout(() => {
      fetch(`/api/${centerId}-booking.json`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          return res.json();
        })
        .then((data: Booking[]) => {
          const fail = Math.random() < 0.1;

          if (fail) {
            reject(new Error("Simulated server error"));
            return;
          }

          resolve(data);
        })
        .catch(err => reject(err));
    }, 1000);
  });
}

export const bookService = (bookingForm: BookingForm, service: Service): Promise<Booking> => {
  return new Promise<Booking>((resolve, reject) => {
    setTimeout(() => {
      const fail = Math.random() < 0.1;

      if (fail) {
        reject(new Error("Simulated server error"));
        return;
      }

      resolve({
        id: `bkg-${Math.random().toString(36).slice(2, 9)}`,
        serviceId: service.id,
        name: bookingForm.name,
        email: bookingForm.email,
        date: bookingForm.date,
        time: bookingForm.time
      });
    }, 1000);
  });
};
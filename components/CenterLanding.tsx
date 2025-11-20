"use client";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { bookService, getBookingsByCenterId, getCenterInfoById, getServicesByCenterId } from "@/lib/services";
import { getEmptyBookingForm, getTimeOptions, parseISODate, validateEmail, validateName } from "@/lib/utils";
import { Booking } from "@/types/Booking";
import { Center } from "@/types/Center";
import { ToastAlert } from "@/types/Component";
import { Service } from "@/types/Service";
import { Clock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import DatePicker from "./DatePicker";

export default function CenterLanding({ centerId }: { centerId: string }) {
  const [centerInfo, setCenterInfo] = useState<Center | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [sumbitting, setSumbitting] = useState(false);
  const [error, setError] = useState("");
  const [toastAlert, setToastAlert] = useState<ToastAlert | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form, setForm] = useState(getEmptyBookingForm);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const info = await getCenterInfoById(centerId);
      setCenterInfo(info);

      const svc = await getServicesByCenterId(centerId);
      setServices(svc);

      const bkg = await getBookingsByCenterId(centerId);
      setBookings(bkg);
    } catch (error) {
      console.error(`loadData - ${error}`);
      setError("Failed to load center information.");
    } finally {
      setLoading(false);
    }
  }, [centerId]);

  useEffect(() => {
    if (!centerId) {
      setError("Center not found");
      return;
    }

    loadData();
  }, [centerId]);

  const handleNameChange = (name: string) => {
    setNameError(validateName(name));
    setForm({ ...form, name });
  };

  const handleEmailChange = (email: string) => {
    setEmailError(validateEmail(email));
    setForm({ ...form, email });
  };

  const closeBookingModal = () => {
    setSelectedService(null);
    setForm(getEmptyBookingForm);
  };

  const handleBooking = async () => {
    if (selectedService) {
      setSumbitting(true);

      try {
        const bkg = await bookService(form, selectedService);
        setBookings([...bookings, bkg]);

        setToastAlert({
          status: "success",
          message: `Booking confirmed for ${form.name} at ${form.date} ${form.time} for ${selectedService?.name}`
        });

        closeBookingModal();
      } catch (error) {
        console.error(`handleBooking - ${error}`);

        setToastAlert({
          status: "error",
          message: "Error booking service. Please try it again."
        });
      } finally {
        setSumbitting(false);
      }
    }
  };



  // Loading alert
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
        <div className="max-w-2xl mx-auto p-6 space-y-6 flex justify-center align-center">
          <Alert variant="loading" title="Loading..." />
        </div>
      </main>
    );
  };

  // Error alert
  if (error || !centerInfo) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
        <div className="max-w-2xl mx-auto p-6 space-y-6 flex justify-center align-center">
          <Alert variant="error" title="Error loading page">
            Please try again, and if the problem persists contact the admin.
          </Alert>
        </div>
      </main>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Center details */}
        <div className="text-center">
          {/* CenterlLogo */}
          <img src={centerInfo.logo} alt="" className="w-24 h-24 mx-auto mb-4" />

          {/* Center mame */}
          <h1 className="text-3xl font-bold">{centerInfo.name}</h1>

          {/* Center description */}
          <p className="mt-2 text-gray-600">{centerInfo.description}</p>
        </div>

        {/* Toast alert */}
        {toastAlert && (
          <Alert
            mode="toast"
            variant={toastAlert.status}
            autoClose={2000}
            onClose={() => { setToastAlert(null) }}
          >
            {toastAlert.message}
          </Alert>
        )}

        {/* Services List */}
        <div className="grid gap-4">
          {services.map((service) => (
            // Service card
            <Card
              id={service.id}
              header={service.name}
              subtitle={service.description}
            >
              <div className="flex justify-between items-center mb-4 text-lg font-semibold">
                {/* Service time */}
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-[#A78BFA]" />
                  <span>{service.duration} min</span>
                </div>

                {/* Service price */}
                <div className="text-[#A78BFA]">
                  ${service.price}
                </div>
              </div>

              {/* Booking button */}
              <Button
                fullWidth
                onClick={() => { setSelectedService(service) }}
              >
                Book
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking modal */}
      {selectedService && (
        <Modal
          title={`Book: ${selectedService?.name ?? ""}`}
          description="Fill out the booking details below."
          confirmLabel="Confirm Booking"
          cancelLabel="Cancel"
          confirmDisabled={!form.name || !form.email || !form.date || !form.time}
          confirmLoading={sumbitting}
          onConfirm={handleBooking}
          onClose={closeBookingModal}
        >
          <div className="space-y-4">
            {/* Client name */}
            <Input
              label="Name"
              placeholder="Full name"
              fullWidth
              variant="primary"
              value={form.name}
              error={nameError}
              onChange={(e) => handleNameChange(e.target.value)}
            />

            {/* Client email */}
            <Input
              label="Email"
              type="email"
              placeholder="Your@email.com"
              fullWidth
              variant="primary"
              value={form.email}
              error={emailError}
              onChange={(e) => handleEmailChange(e.target.value)}
            />

            {/* Service date */}
            <DatePicker
              label="Date"
              placeholder="Select a date"
              value={form.date ? parseISODate(form.date) : undefined}
              fullWidth
              onChange={(e) => setForm({ ...form, date: e })}
            />

            {/* Service time */}
            <Select
              label="Time"
              placeholder="Select a time"
              value={form.time}
              options={getTimeOptions(selectedService, bookings, form.date)}
              disabled={!form.date}
              variant="primary"
              fullWidth
              onChange={(value) => setForm({ ...form, time: value })}
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
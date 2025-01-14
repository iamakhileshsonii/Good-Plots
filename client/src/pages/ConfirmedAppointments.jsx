import Confirmed from "@/components/appointment/confirmed";
import { confirmedAppointments } from "@/services/appointmentApi";
import React, { useEffect, useState } from "react";

const ConfirmedAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  //Fetch confirmed appointments
  const fetchAppointments = async () => {
    try {
      const res = await confirmedAppointments();

      if (res) {
        console.log("Confirmed Appointments: ", res);
        setAppointments(res);
      }
    } catch (error) {
      console.error(
        "Something went wrong while fetching confirmed appointments"
      );
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="block">
      <h1 className="font-semibold text-lg underline underline-offset-2 ">
        Confirmed Appointments
      </h1>

      <div className="flex gap-4 flex-wrap p-10 justify-center">
        {appointments.map((appointment) => (
          <Confirmed
            key={appointment?._id}
            appointmentId={appointment?._id}
            user={appointment?.appointmentWithUser?.fullname}
            role={appointment?.appointmentWithUser?.role}
            date={appointment?.appointmentDate}
            time={appointment?.appointmentTime}
            avatar={appointment?.appointmentWithUser?.avatar}
            propertyName={appointment?.appointmentForProperty?.title}
            propertyImage={
              appointment?.appointmentForProperty?.details[0].photos.siteView
            }
            propertyAmount={appointment?.appointmentForProperty?.expectedPrice}
            propertySubtype={
              appointment?.appointmentForProperty?.propertySubtype
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ConfirmedAppointments;

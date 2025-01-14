import RequestedByMe from "@/components/appointment/requested-by-me";
import { requestedByMeAppointments } from "@/services/appointmentApi";
import React, { useEffect, useState } from "react";

const RequestedByMeAppointments = () => {
  const [allAppointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await requestedByMeAppointments();

      if (res) {
        setAppointments(res);
      }
    } catch (error) {
      console.error("Something went wrong while fetching appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="block">
      <h1 className="font-semibold text-lg underline underline-offset-2 ">
        Requested By Me
      </h1>

      <div className="flex gap-4 flex-wrap p-2 sm:p-10 justify-start">
        {allAppointments &&
          allAppointments.map((appointment) => (
            <RequestedByMe
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
              propertyAmount={
                appointment?.appointmentForProperty?.expectedPrice
              }
              propertySubtype={
                appointment?.appointmentForProperty?.propertySubtype
              }
            />
          ))}
      </div>
    </div>
  );
};

export default RequestedByMeAppointments;

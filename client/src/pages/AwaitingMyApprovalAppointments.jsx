import AwaitingMyApproval from "@/components/appointment/await-my-approval";
import { awaitingMyApprovalAppointments } from "@/services/appointmentApi";
import React, { useEffect, useState } from "react";

const AwaitingMyApprovalAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await awaitingMyApprovalAppointments();

    if (res) {
      setAppointments(res);
    } else {
      console.log("No appointments found");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="block">
      <h1 className="font-semibold text-lg underline underline-offset-2 ">
        Awaiting My Approval
      </h1>

      <div className="flex gap-4 flex-wrap p-10 justify-center">
        {appointments.map((appointment) => (
          <AwaitingMyApproval
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

export default AwaitingMyApprovalAppointments;

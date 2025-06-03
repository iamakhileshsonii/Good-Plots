import RequestedByMe from "@/components/appointment/requested-by-me";
import NoResults from "@/components/no-results";
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

  const ifNotFound = {
    mainTitle: "No Awaiting Approval Appointments Found",
    mainDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit quasi explicabo saepe facilis adipisci omnis vero repellat sequi aliquam incidunt?.",
    mainLink: "/account",

    card1logo: <i class="fa-solid fa-house"></i>,
    card1title: "Explore Properties",
    card1desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    card1link: "/account",
    card1linkText: "View",

    card2logo: <i class="fa-solid fa-user-clock"></i>,
    card2title: "Confirmed Appointments",
    card2desc:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, at.",
    card2link: "/account",
    card2linkText: "View",

    card3logo: <i class="fa-solid fa-address-card"></i>,
    card3title: "About Us",
    card3desc:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, at.",
    card3link: "/account",
    card3linkText: "View",
  };

  return (
    <div className="block">
      <h1 className="font-semibold text-lg underline underline-offset-2 ">
        Requested By Me
      </h1>

      <div className="flex gap-4 flex-wrap p-2 md:p-10 justify-start ">
        {allAppointments.length > 0 ? (
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
          ))
        ) : (
          <NoResults
            mainTitle={ifNotFound.mainTitle}
            mainDesc={ifNotFound.mainDesc}
            mainLink={ifNotFound.mainLink}
            card1logo={ifNotFound.card1logo}
            card1title={ifNotFound.card1title}
            card1desc={ifNotFound.card1desc}
            card1link={ifNotFound.card1link}
            card1linkText={ifNotFound.card1linkText}
            card2logo={ifNotFound.card2logo}
            card2title={ifNotFound.card2title}
            card2desc={ifNotFound.card2desc}
            card2link={ifNotFound.card2link}
            card2linkText={ifNotFound.card2linkText}
            card3logo={ifNotFound.card3logo}
            card3title={ifNotFound.card3title}
            card3desc={ifNotFound.card3desc}
            card3link={ifNotFound.card3link}
            card3linkText={ifNotFound.card3linkText}
          />
        )}
      </div>
    </div>
  );
};

export default RequestedByMeAppointments;

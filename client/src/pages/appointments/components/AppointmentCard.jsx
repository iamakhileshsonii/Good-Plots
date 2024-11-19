import React, { useEffect, useState } from "react";
import {
  getCurrentPropertyData,
  getPropertyOwnerDetails,
  rejectAppointmentApi,
} from "../../../services/api";
import useExcerpt from "../../../hooks/useExcerpt";
import defaultAvatar from "../../../assets/images/userAvatar.png";
import { initFlowbite, Tooltip } from "flowbite";
import defaultProperty from "../../../assets/images/DefaultProperty.jpg";

const AppointmentCard = ({ appointment, appointmentId }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [propertyData, setPropertyData] = useState();
  const [propertyOwner, setPropertyOwner] = useState();
  const [appointmentDate, setAppointmentDate] = useState();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    async function getCardData() {
      const appointmentPropertyData = await getCurrentPropertyData(
        appointment?.appointmentFor
      );
      const appointmentPropertyOwner = await getPropertyOwnerDetails(
        appointment?.appointmentWith
      );
      const appointment_Data = appointment?.appointmentDate;

      setAppointmentDate(new Date(appointment_Data).toLocaleDateString());
      setPropertyData(appointmentPropertyData);
      setPropertyOwner(appointmentPropertyOwner);

      if (appointmentPropertyOwner?.role === "0") {
        setUserRole("Buyer/ Seller");
      } else if (appointmentPropertyOwner?.role === "1") {
        setUserRole("Broker");
      } else if (appointmentPropertyOwner?.role === "2") {
        setUserRole("User/Client");
      } else {
        setUserRole("Admin");
      }
    }

    console.log(
      "PROPERTY IMAGE IN DETAILS: ",
      propertyData?.propertyData?.photos?.siteview
    );
    getCardData();
  }, [appointment]);

  // Use the useExcerpt hook
  const excerpt = useExcerpt(propertyData?.description);

  //Reject Appointment
  async function rejectAppointment(appointment_id) {
    const response = await rejectAppointmentApi(appointment_id);
    if (!response) {
      window.alert("Something went wrong");
    }
  }

  return (
    <div className="px-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col  items-center pb-3">
        <div className="flex flex-row gap-4 py-2 px-1 items-center ">
          <img
            className="w-14 h-14 rounded-full shadow-lg"
            src={propertyOwner?.avatar || defaultAvatar}
            alt="Avatar"
          />
          <div>
            <h5 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {propertyOwner?.fullname}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userRole}
            </span>
          </div>

          <div className="flex justify-end pr-2 pt-1">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>

            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    data-modal-target="static-modal"
                    data-modal-toggle="static-modal"
                  >
                    View Details
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Renotify
                  </a>
                </li>

                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Reschedule
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => rejectAppointment(appointmentId)}
                  >
                    Reject
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-center pb-3">
        <div className="flex justify-center gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <p className="text-xs">{appointmentDate}</p>
        </div>
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <p className="text-xs">10:30PM</p>
        </div>
      </div>

      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overscroll-y-contain"
      >
        <div className="relative p-4 w-1/4">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Appointment Details
              </h3>

              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3 text-red"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <img
                  src={
                    propertyData?.propertyData?.photos.siteView ||
                    defaultProperty
                  }
                  alt=""
                  className="w-full h-52 object-cover rounded-lg shadow-lg dark:bg-gray-500"
                />
              </div>
              <h4 className="font-bold text-xl">{propertyData?.title}</h4>
              <p>{excerpt}</p>

              <div className="flex justify-between px-10 border border-black-light rounded-md py-4">
                <div className="flex justify-center gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <h6 className="font-semibold">{appointmentDate}</h6>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <h6 className="font-semibold">10:30PM</h6>
                </div>
              </div>

              <div
                className="flex gap-2 items-center py-4 px-3 rounded-md"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                <div>
                  <img src={defaultAvatar} alt="" className="h-12 w-12" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">
                    {propertyOwner?.fullname}
                  </h4>
                  <p className="text-xs">{propertyOwner?.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <svg
                data-tooltip-target="tooltip-details-renotify-appointment"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
              <div
                id="tooltip-details-renotify-appointment"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Renotify about Appointment to owner
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              <svg
                data-tooltip-target="tooltip-details-reschedule-appointment"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <div
                id="tooltip-details-reschedule-appointment"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Reschedule Appointment
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              <svg
                data-tooltip-target="tooltip-details-reject-appointment"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-red hover:cursor-pointer"
                data-modal-hide="static-modal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              <div
                id="tooltip-details-reject-appointment"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Cancel Appointment
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <svg
                data-tooltip-target="tooltip-details-accept-appointment"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-green hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <div
                id="tooltip-details-accept-appointment"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Accept Appointment
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;

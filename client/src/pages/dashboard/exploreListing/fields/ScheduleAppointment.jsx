import React, { useContext, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";

import {
  getCurrentPropertyData,
  scheduleAppointmentApi,
} from "../../../../services/api";
import { authContext } from "../../../../context/authContext";

const ScheduleAppointment = ({ feedId, feedData, feed }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const { authUser } = useContext(authContext);

  const [email, setEmail] = useState(authUser?.email || "");
  const [name, setName] = useState(authUser?.fullname || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [clientId, setClientId] = useState(authUser?._id);

  const [appointmentBy] = useState(authUser?._id);
  const [appointmentFor] = useState(feed?._id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fecthFeedDetails() {
      const response = await getCurrentPropertyData(feedId);
      setClientId(response?.owner);
    }
    fecthFeedDetails();
  }, []);

  const handleClick = async () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    const formData = {
      appointmentBy,
      appointmentFor,
      appointmentDate,
      appointmentWith: clientId,
    };

    await scheduleAppointmentApi(formData);
  };
  return (
    <>
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
          aria-controls={`appointment-drawer-${feedId}`}
          data-modal-target={`appointment-modal-${feedId}`}
          data-modal-toggle={`appointment-modal-${feedId}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      </div>

      <div
        id={`appointment-modal-${feedId}`}
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex-col"
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={`appointment-modal-${feedId}`}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              <div className="flex justify-center items-center flex-col">
                <p className="inline-flex items-center text-base text-black-dark mb-0 ">
                  Schedule Appointment For
                </p>
                <h4 className="inline-flex items-center mb-4 text-xl font-bold text-red dark:text-gray-400">
                  {feedData?.title}
                </h4>
              </div>

              <form
                className="max-w-sm mx-auto"
                onSubmit={handleBookAppointment}
              >
                <div className="mb-5">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone no.
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="relative max-w-sm">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full"
                    placeholder="Select date"
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 my-8">
                  <a
                    href="#"
                    data-modal-hide={`appointment-modal-${feedId}`}
                    className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-red rounded-lg"
                    data-modal-hide={`appointment-modal-${feedId}`}
                  >
                    Schedule{"  "}
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ml-2 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleAppointment;

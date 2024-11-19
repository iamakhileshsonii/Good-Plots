import React, { useEffect, useState } from "react";
import AppointmentCard from "./components/AppointmentCard";
import {
  confirmedAppointmentsApi,
  requestedAppointmentsApi,
  sentAppintmentsApi,
} from "../../services/api";
import Confirmed from "./components/Confirmed";
import AwaitingAppointmentCard from "./components/AwaitingAppointmentCard";

const Appointments = () => {
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [sentAppointments, setSentAppointments] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("confirmed"); // State to manage active tab

  useEffect(() => {
    async function getSentAppointments() {
      try {
        const sentResponse = await sentAppintmentsApi();
        const requestedResponse = await requestedAppointmentsApi();
        const confirmedResponse = await confirmedAppointmentsApi();

        setRequestedAppointments(requestedResponse || []);
        setSentAppointments(sentResponse || []);
        setConfirmedAppointments(confirmedResponse || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setRequestedAppointments([]);
        setSentAppointments([]);
        setConfirmedAppointments([]);
      }
    }
    getSentAppointments();
  }, []);

  return (
    <div className="w-full ">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <button
            onClick={() => setActiveTab("confirmed")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "confirmed"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg group`}
          >
            <svg
              className={`w-4 h-4 me-2 ${
                activeTab === "confirmed"
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Confirmed Appointments
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("sent")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "sent"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg group`}
          >
            <svg
              className={`w-4 h-4 me-2 ${
                activeTab === "sent"
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Requested By Me
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("requested")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "requested"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg group`}
          >
            <svg
              className={`w-4 h-4 me-2 ${
                activeTab === "requested"
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            Awaiting my approval
          </button>
        </li>
      </ul>

      <div className="w-full my-10">
        {activeTab === "confirmed" && (
          <div className="flex flex-wrap gap-3 ">
            {confirmedAppointments.length === 0 ? (
              <p>No appointments</p>
            ) : (
              confirmedAppointments.map((appointment) => (
                <Confirmed
                  key={appointment._id}
                  appointment={appointment}
                  appointmentId={appointment._id}
                />
              ))
            )}
          </div>
        )}

        {activeTab === "sent" && (
          <div className="flex flex-wrap gap-3 ">
            {sentAppointments.length === 0 ? (
              <p>No appointments</p>
            ) : (
              sentAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  appointmentId={appointment._id}
                />
              ))
            )}
          </div>
        )}
        {activeTab === "requested" && (
          <div className="flex flex-wrap gap-3 ">
            {requestedAppointments.length === 0 ? (
              <p>No appointments</p>
            ) : (
              requestedAppointments.map((appointment) => (
                <AwaitingAppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  appointmentId={appointment._id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;

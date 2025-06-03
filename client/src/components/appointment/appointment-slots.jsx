import React from "react";

const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let currentTime = start;

  while (currentTime < end) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const formattedTime = `${hours % 12 || 12}:${
      minutes === 0 ? "00" : minutes
    } ${hours >= 12 ? "PM" : "AM"}`;

    slots.push({ formattedTime, timeInMinutes: currentTime });
    currentTime += interval;
  }

  return slots;
};

export default function AppointmentSlots({ value, onChange }) {
  const slots = generateTimeSlots(9 * 60, 20 * 60, 30); // 9:00 AM to 8:00 PM

  // Get current time in minutes (from midnight)
  const currentTimeInMinutes =
    new Date().getHours() * 60 + new Date().getMinutes();

  return (
    <select
      className="p-2 border rounded-lg bg-gray-100 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        Select a time slot
      </option>
      {slots.map(({ formattedTime, timeInMinutes }, index) => (
        <option
          key={index}
          value={formattedTime}
          disabled={timeInMinutes < currentTimeInMinutes} // Disable past time slots
        >
          {formattedTime}
        </option>
      ))}
    </select>
  );
}

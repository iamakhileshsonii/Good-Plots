import React, { useState } from "react";
import useSendSaleNotationMessage from "../../../services/useSendSaleNotationMessage";

const AgreementDate = ({ messages, conversation }) => {
  const [date, setDate] = useState(""); // Initialize date with an empty string
  const { sendMessage } = useSendSaleNotationMessage();
  const action = "accepted";
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    let brokerId = "66b9da5ef3be3db0871bfa85";
    let lawyerId = "66b6fb77c58fa3a8b3f9dea1";
    let sellerId = "667e914883c44da60a4e61d0";
    let propertyId = conversation?.propertyDetails._id;

    const systemMessage = {
      brokerId,
      lawyerId,
      sellerId,
      propertyId,
      action: null,
      agreementDate: null,
      totalPaymentAmount: null,
      totalTime: null,
      earnestMoney: null,
      dateOfPayment: null,
      expectedBySeller_totalPaymentAmount: null,
      expectedBySeller_totalTime: null,
      expectedBySeller_earnestMoney: null,
      type: 1, // Keep type as 1
      systemMessage: `ABC Lawyer has joined`,
    };

    const brokerResponse = {
      brokerId,
      lawyerId,
      sellerId,
      propertyId,
      action,
      agreementDate: date,
      totalPaymentAmount: "",
      totalTime: "",
      earnestMoney: "",
      dateOfPayment: "",
      expectedBySeller_totalPaymentAmount: "",
      expectedBySeller_totalTime: "",
      expectedBySeller_earnestMoney: "",
      token_doc: "",
      earnestMoney_doc: "",
      saleDeed_doc: "",
    };

    await sendMessage(brokerResponse);
    await sendMessage(systemMessage);
    // console.log("Broker response sent successfully", brokerResponse);
  };

  return (
    <div className="flex justify-center py-2">
      <form onSubmit={handleSubmit} className="flex justify-center flex-col">
        <p>Agreement signing date</p>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            type="date"
            id="default-datepicker"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {date.length > 0 && ( // Show the button only if a date is selected
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        )}
      </form>
    </div>
  );
};

export default AgreementDate;

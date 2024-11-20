import React, { useState } from "react";
import useSendSaleNotationMessage from "../../../services/useSendSaleNotationMessage";

const OfferForm = ({ conversation, setOfferFormVisibility, setOfferForm }) => {
  // Get counter form details
  const [counter_totalPaymentAmount, setCounter_totalPaymentAmount] =
    useState("");
  const [counter_totalTime, setCounter_totalTime] = useState("");
  const [counter_EarnestMoney, setCounter_EarnestMoney] = useState("");
  const [counter_DateOfPayment, setCounter_DateOfPayment] = useState("");

  const { sendMessage, loading } = useSendSaleNotationMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let brokerId = "66b9da5ef3be3db0871bfa85";
    let lawyerId = "66b6fb77c58fa3a8b3f9dea1";
    let sellerId = "667e914883c44da60a4e61d0";
    let propertyId = conversation?.propertyDetails._id;
    const action = "counter";
    const agreementDate = "";

    const offerData = {
      brokerId,
      lawyerId,
      sellerId,
      propertyId,
      action,
      agreementDate,
      totalPaymentAmount: counter_totalPaymentAmount,
      totalTime: counter_totalTime,
      earnestMoney: counter_EarnestMoney,
      dateOfPayment: counter_DateOfPayment,
      expectedBySeller_totalPaymentAmount: 1234,
      expectedBySeller_totalTime: 123,
      expectedBySeller_earnestMoney: 123123,
    };

    await sendMessage(offerData);

    setOfferFormVisibility(false);
    setOfferForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-black-light p-2 rounded-md my-3">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="sm:w-1/2">
            <div className="flex gap-2 m-2">
              <p className="text-sm">Total Payment Amount</p>
              <input
                type="number" // Set input type to number
                className="text-sm p-0"
                value={counter_totalPaymentAmount}
                onChange={(e) => setCounter_totalPaymentAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2 m-2">
              <p className="text-sm text-black">Expected by seller</p>
              <input type="number" className="text-sm p-0" />
            </div>
          </div>
          <div className="sm:w-1/2">
            <div className="flex gap-2 m-2">
              <p className="text-sm">Total time</p>
              <input
                type="number" // Set input type to number
                className="text-sm p-0"
                value={counter_totalTime}
                onChange={(e) => setCounter_totalTime(e.target.value)}
              />
            </div>
            <div className="flex gap-2 m-2">
              <p className="text-sm text-black">Expected by seller</p>
              <input type="number" className="text-sm p-0" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="sm:w-1/2">
            <div className="flex gap-2 m-2">
              <p className="text-sm">Earnest money</p>
              <input
                type="number" // Set input type to number
                className="text-sm p-0"
                value={counter_EarnestMoney}
                onChange={(e) => setCounter_EarnestMoney(e.target.value)}
              />
            </div>
            <div className="flex gap-2 m-2">
              <p className="text-sm text-black">Expected by seller</p>
              <input type="number" className="text-sm p-0" />
            </div>
          </div>
          <div className="sm:w-1/2">
            <div className="flex gap-2 m-2">
              <p className="text-sm">Date of payment</p>
              <input
                type="date" // Set input type to number
                className="text-sm p-0"
                value={counter_DateOfPayment}
                onChange={(e) => setCounter_DateOfPayment(e.target.value)}
              />
            </div>
            <div className="flex gap-2 m-2">
              <p className="text-sm text-black">
                Forfeiture in case of default by the buyer <br /> Double return
                in case of default by the seller
              </p>
            </div>
          </div>
        </div>

        <div className="my-3 flex w-full justify-center">
          <button
            type="submit"
            className="bg-red text-white rounded-md px-4 py-1"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Sending..." : "Send Offer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;

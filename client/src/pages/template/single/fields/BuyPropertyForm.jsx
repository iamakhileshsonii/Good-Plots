import React, { useContext, useState } from "react";
import useSendSaleNotationMessage from "../../../../services/useSendSaleNotationMessage";
import { authContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";

const BuyPropertyForm = ({ property, expectedPrice, expectedEarnest }) => {
  const navigate = useNavigate();
  // Hide Or Show form
  const [showForm, setShowForm] = useState(false);

  // Get counter form details
  const [totalPaymentAmount, setTotalPaymentAmount] = useState("");
  const [TotalTime, setTotalTime] = useState("");
  const [EarnestMoney, setEarnestMoney] = useState("");
  const [DateOfPayment, setDateOfPayment] = useState("");
  const { authUser } = useContext(authContext);

  const [
    totalPaymentAmount_expectedBySeller,
    setTotalPaymentAmount_expectedBySeller,
  ] = useState("");
  const [TotalTime_expectedBySeller, setTotalTime_expectedBySeller] =
    useState("");
  const [EarnestMoney_expectedBySeller, setEarnestMoney_expectedBySeller] =
    useState("");

  const { sendMessage, loading } = useSendSaleNotationMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let brokerId = "66b9da5ef3be3db0871bfa85";
    let lawyerId = "66b6fb77c58fa3a8b3f9dea1";
    let sellerId = property?.owner;
    let propertyId = property?._id;
    const action = "pending";
    const agreementDate = "";
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
      systemMessage: `${authUser?.fullname} has initiated the sale notation`,
    };

    const offerData = {
      brokerId,
      lawyerId,
      sellerId,
      propertyId,
      action,
      agreementDate,
      totalPaymentAmount,
      totalTime: TotalTime,
      earnestMoney: EarnestMoney,
      dateOfPayment: DateOfPayment,
      expectedBySeller_totalPaymentAmount: expectedPrice,
      expectedBySeller_totalTime: expectedPrice,
      expectedBySeller_earnestMoney: expectedEarnest,
    };

    await sendMessage(systemMessage);
    await sendMessage(offerData);
    navigate("/dashboard/sale-notations");
    setShowForm(false);
  };

  const handleFormDisplay = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  return (
    <>
      {showForm ? (
        ""
      ) : (
        <div className="flex gap-4 justify-center  my-6">
          <button
            className="border border-black rounded-md p-2 hover:text-white hover:bg-red-dark"
            onClick={handleFormDisplay}
          >
            Make a counter offer
          </button>
          <button className="border border-black rounded-md p-2 hover:text-white hover:bg-red-dark">
            Accept offer
          </button>
        </div>
      )}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="border border-dotted border-black p-4 relative rounded-2xl my-6"
        >
          <div className="flex justify-between mb-2 w-full">
            <p className="text-center font-semibold underline">Make An Offer</p>
            <div className=" justify-center px-2">
              <i
                class="fa-solid fa-xmark cursor-pointer text-lg text-red-dark absolute mr-0"
                onClick={handleFormDisplay}
              ></i>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between ">
            {/* Left Side */}
            <div className="sm:w-1/2">
              <div className="flex gap-2 m-2 items-center">
                <p className="text-sm">Total Payment Amount</p>
                <input
                  type="number"
                  className="text-sm p-1 border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 w-1/3 focus:outline-none focus:ring-0 focus:border-gray-500"
                  value={totalPaymentAmount}
                  onChange={(e) => setTotalPaymentAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="sm:w-1/2">
              <div className="flex gap-2 m-2 items-center">
                <p className="text-sm">Total time</p>
                <input
                  type="text"
                  className="text-sm p-1 border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 w-1/3 focus:outline-none focus:ring-0 focus:border-gray-500"
                  value={TotalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between">
            {/* Left Side */}
            <div className="sm:w-1/2">
              <div className="flex gap-2 m-2 items-center">
                <p className="text-sm">Earnest money</p>
                <input
                  type="number"
                  className="text-sm p-1 border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 w-1/3 focus:outline-none focus:ring-0 focus:border-gray-500"
                  value={EarnestMoney}
                  onChange={(e) => setEarnestMoney(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="sm:w-1/2">
              <div className="flex gap-2 m-2 items-center">
                <p className="text-sm">Date of payment</p>
                <input
                  type="date"
                  className="text-sm p-1 border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 w-1/3 focus:outline-none focus:ring-0 focus:border-gray-500"
                  value={DateOfPayment}
                  onChange={(e) => setDateOfPayment(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-start">
                <p className="text-xs text-black-dark text-left">
                  Forfeiture in case of default by the buyer <br /> Double
                  return in case of default by the seller
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center">
            <button
              type="submit"
              className="border border-solid border-rad-dark text-red-dark font-semibold text-xs rounded-md px-4 py-1 hover:bg-red-dark hover:text-white"
            >
              PROPOSE
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default BuyPropertyForm;

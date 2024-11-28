import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BuyPropertyForm from "./BuyPropertyForm";
import defaultAvatar from "../../../../assets/images/userAvatar.png";
import { authContext } from "../../../../context/authContext";
import axios from "axios";
import { Modal } from "flowbite"; // Import Modal class to initialize it properly

const BuyProperty = ({ property }) => {
  const [showBuyPropertyBtn, setShowBuyPropertyBtn] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authToken } = useContext(authContext);
  const [convoRes, setConvoRes] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    // Initialize Flowbite's modal here
    const modalElement = document.getElementById("propertyBuy-form");
    const options = { backdrop: "dynamic", placement: "center" }; // Options to customize modal behavior
    const flowbiteModal = new Modal(modalElement, options);
    setModal(flowbiteModal);
  }, []);

  useEffect(() => {
    const convoExists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/saleNotation/conversationExists/${property._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data === 1) {
          setShowBuyPropertyBtn(false);
        } else if (response.data.data === 0) {
          setShowBuyPropertyBtn(true);
        }
        setConvoRes(response.data.data);
        console.log("RESPONSE GOT: ", response.data.data);
      } catch (error) {
        console.log(
          "Something went wrong while checking existing conversation",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    convoExists();
  }, [property._id, authToken]);

  const toggleModal = () => {
    if (modal) {
      modal.toggle();
    }
  };

  return (
    <div className="p-4 rounded-xl my-2 bg-white shadow-lg border border-black-light">
      {showBuyPropertyBtn ? (
        <button
          onClick={toggleModal} // Trigger modal toggle here
          className="block text-black-dark w-full text-center hover:text-red"
          type="button"
        >
          Initiate Purchase
        </button>
      ) : (
        <Link to="/dashboard/sale-notations">
          <button
            className="block text-black-dark w-full text-center hover:text-red"
            type="button"
          >
            Sale Notation
          </button>
        </Link>
      )}

      {/* Modal for initiating purchase */}
      <div
        id="propertyBuy-form"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-1 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
            <div className="flex items-center justify-between p-4 md:p-1 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Initiate Purchase
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal} // Ensure modal is closed
              >
                <svg
                  className="w-3 h-3"
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

            <div className="relative p-4 w-full max-w-2xl max-h-full ">
              <p className="font-semibold text-red-dark text-lg">
                {property?.title} for {property?.saleType}
              </p>

              <div className="flex justify-center gap-5">
                <div className="w-1/2 p-1">
                  <div>
                    <p className="text-sm font-semibold ">Property Subtype:</p>
                    <p className="text-sm">{property?.propertySubtype}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold ">
                      Facing:{" "}
                      <span className="text-md font-normal">
                        {property?.propertyData?.area?.facing}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-1/2 p-1">
                  <div>
                    <p className="text-sm font-semibold ">
                      Asking Price:{" "}
                      <span className="text-md font-normal">
                        ₹{property.expectedPrice}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold ">
                      Total Area:{" "}
                      <span className="text-md font-normal">
                        {property?.totalArea} Sq.Ft.
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold ">
                      Carpet Area:{" "}
                      <span className="text-md font-normal">
                        {property?.propertyData?.area?.carpetArea} Sq.Ft.
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold ">
                      Builtup Area:{" "}
                      <span className="text-md font-normal">
                        {property?.propertyData?.area?.builtUpArea} Sq.Ft.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative p-4 w-full max-w-2xl max-h-full border border-dotted border-black rounded-2xl">
              <div className="flex gap-2 items-center mb-2">
                <img
                  src={property?.ownerData?.avatar || defaultAvatar}
                  alt="Property Owner"
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold text-black-dark text-lg">
                  Expected by seller
                </p>
              </div>
              <p className="text-md text-black">
                <span className="text-black-dark">Total payment amount:</span> ₹
                {property?.expectedPrice}
              </p>
              <p className="text-md text-black">
                <span className="text-black-dark">Total time:</span> 3 Months
              </p>
              <p className="text-md text-black">
                <span className="text-black-dark">Earnest money:</span> Sq.Ft.
                {property?.totalArea}
              </p>
            </div>

            <div className="space-y-4">
              <BuyPropertyForm
                property={property}
                expectedPrice={property.expectedPrice}
                expectedEarnest={property.expectedPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProperty;

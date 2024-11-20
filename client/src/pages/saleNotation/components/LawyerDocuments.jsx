import React, { useState } from "react";
import useSendSaleNotationMessage from "../../../services/useSendSaleNotationMessage";
import axios from "axios";

const LawyerDocuments = ({ conversation }) => {
  const [tokenFile, setTokenFile] = useState(null);
  const [earnestMoneyFile, setEarnestMoneyFile] = useState(null);
  const [saleDeedFile, setSaleDeedFile] = useState(null);
  const { sendMessage } = useSendSaleNotationMessage();
  const action = "accepted";

  let brokerId = "66b9da5ef3be3db0871bfa85";
  let lawyerId = "66b6fb77c58fa3a8b3f9dea1";
  let sellerId = "667e914883c44da60a4e61d0";
  let propertyId = conversation?.propertyDetails._id;

  const lawyerResponse = {
    brokerId,
    lawyerId,
    sellerId,
    propertyId,
    action,
    agreementDate: "",
    totalPaymentAmount: "",
    totalTime: "",
    earnestMoney: "",
    dateOfPayment: "",
    expectedBySeller_totalPaymentAmount: "",
    expectedBySeller_totalTime: "",
    expectedBySeller_earnestMoney: "",
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleUploadAll = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brokerId", brokerId);
    formData.append("lawyerId", lawyerId);
    formData.append("sellerId", sellerId);
    formData.append("propertyId", propertyId);
    formData.append("action", action);
    formData.append("agreementDate", lawyerResponse.agreementDate);
    formData.append("totalPaymentAmount", lawyerResponse.totalPaymentAmount);
    formData.append("totalTime", lawyerResponse.totalTime);
    formData.append("earnestMoney", lawyerResponse.earnestMoney);
    formData.append("dateOfPayment", lawyerResponse.dateOfPayment);
    formData.append(
      "expectedBySeller_totalPaymentAmount",
      lawyerResponse.expectedBySeller_totalPaymentAmount
    );
    formData.append(
      "expectedBySeller_totalTime",
      lawyerResponse.expectedBySeller_totalTime
    );
    formData.append(
      "expectedBySeller_earnestMoney",
      lawyerResponse.expectedBySeller_earnestMoney
    );
    formData.append("token_doc", tokenFile);
    formData.append("earnestMoney_doc", earnestMoneyFile);
    formData.append("saleDeed_doc", saleDeedFile);
    console.log("CURRENT CONVERSATION: ", conversation);
    try {
      const authToken = localStorage.getItem("goodplotsAuthToken"); // Ensure token is up-to-date
      const res = await axios.post(
        `http://localhost:3001/api/v1/saleNotation/send-lawyer-message/${conversation?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Message sent successfully", res.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code that falls out of the range of 2xx
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Network error or no response:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
      throw new Error("Unable to send message");
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1st Card - Token */}
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg font-bold text-red-dark">Token</p>
          <label className="cursor-pointer text-blue-500 underline text-sm">
            Upload Doc
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setTokenFile)}
              style={{ display: "none" }}
            />
          </label>
          {tokenFile && <p className="mt-2 text-sm">File: {tokenFile.name}</p>}
        </div>

        {/* 2nd Card - Earnest Money */}
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg font-bold text-red-dark">Earnest Money</p>
          <label className="cursor-pointer text-blue-500 underline text-sm">
            Upload Doc
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setEarnestMoneyFile)}
              style={{ display: "none" }}
            />
          </label>
          {earnestMoneyFile && (
            <p className="mt-2 text-sm">File: {earnestMoneyFile.name}</p>
          )}
        </div>

        {/* 3rd Card - Sale Deed */}
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg font-bold text-red-dark">Sale Deed</p>
          <label className="cursor-pointer text-blue-500 underline text-sm">
            Upload Doc
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setSaleDeedFile)}
              style={{ display: "none" }}
            />
          </label>
          {saleDeedFile && (
            <p className="mt-2 text-sm">File: {saleDeedFile.name}</p>
          )}
        </div>
      </div>

      {/* Show the "Upload All" button only if all files are uploaded */}
      {tokenFile && earnestMoneyFile && saleDeedFile && (
        <div className="mt-6 flex flex-row justify-center">
          <button
            className="bg-red text-white px-4 py-2 rounded"
            onClick={handleUploadAll}
          >
            Share Doc
          </button>
        </div>
      )}
    </div>
  );
};

export default LawyerDocuments;

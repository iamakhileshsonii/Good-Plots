import React, { useEffect, useState } from "react";
import defaultPropertyImg from "../../assets/images/pendingKyc.jpg";
import useExcerpt from "../../hooks/useExcerpt.js";
import useShortTitle from "../../hooks/useExcerpt.js";

const MyListingPropertyCard = ({ listing }) => {
  const [kycStatus, setKycStatus] = useState(null);
  const title = useShortTitle(listing?.title);
  const excerpt = useExcerpt(listing?.description);

  useEffect(() => {
    if (listing?.kyc === "pending") {
      setKycStatus("pending");
    } else if (listing?.kyc === "completed") {
      setKycStatus("completed");
    } else {
      setKycStatus(null);
    }
  }, [listing]);

  const propertyUrl =
    kycStatus === "pending"
      ? `/dashboard/property-kyc/${listing._id}`
      : `/property/${listing._id}`;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <a href={propertyUrl}>
        <img
          className="rounded-t-lg object-cover w-full h-48"
          src={listing?.kycData?.[0]?.photos?.siteView || defaultPropertyImg}
          alt="Property"
        />
      </a>
      <div className="p-5 flex flex-col flex-grow">
        <a href={propertyUrl}>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title || "Dummy Title"}
          </h5>
        </a>
        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 flex-grow">
          {excerpt ||
            "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
        </p>
        <a
          href={propertyUrl}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:outline-none mt-auto ${
            kycStatus === "pending"
              ? "text-black-dark bg-yellow-400"
              : "text-white bg-red-dark"
          }`}
        >
          {kycStatus === "pending" ? "Complete KYC" : "View Property"}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-white"
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
        </a>
      </div>
    </div>
  );
};

export default MyListingPropertyCard;

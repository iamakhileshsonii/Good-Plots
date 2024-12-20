import React from "react";

export default function SaleNotationOfferTemplate({
  expectedByBuyer_earnestMoney,
  expectedByBuyer_totalPaymentAmount,
  expectedByBuyer_totalTime,
  expectedBySeller_totalPaymentAmount,
  expectedBySeller_totalTime,
  expectedBySeller_earnestMoney,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-1 ">
      {/* Expected by Seller */}
      <div>
        <p className="text-sm font-semibold text-primary mb-4">
          Expected by Seller
        </p>
        <div className="space-y-4">
          <div className="block">
            <p className="block text-xs font-medium text-left text-black dark:text-white">
              Expected Amount
            </p>
            <p className="text-left text-sm font-semibold">
              {expectedBySeller_totalPaymentAmount}
            </p>
          </div>
          <div className="block">
            <p className="block text-xs font-medium text-left text-black dark:text-white">
              Expected Time
            </p>
            <p className="text-left text-sm font-semibold">
              {expectedBySeller_totalTime}
            </p>
          </div>
          <div className="block">
            <p className="block text-xs font-medium text-left text-black dark:text-white ">
              Earnest Money
            </p>
            <p className="text-left text-sm font-semibold">
              {expectedBySeller_earnestMoney || "NA"}
            </p>
          </div>
        </div>
      </div>

      {/* Expected by Buyer */}
      <div>
        <p className="text-sm font-semibold text-primary mb-4">
          Expected by Buyer
        </p>
        <div className="space-y-4">
          <div className="block">
            <p className="block text-xs font-medium text-left text-black dark:text-white">
              Expected Amount
            </p>
            <p className="text-left text-sm font-semibold">
              {expectedByBuyer_totalPaymentAmount}
            </p>
          </div>
          <div className="block">
            <p className="block text-xs font-medium text-left text-black dark:text-white">
              Expected Time
            </p>
            <p className="text-left text-sm font-semibold">
              {expectedByBuyer_totalTime}
            </p>
          </div>
          <div className="block">
            <p className="block text-xs font-medium text-left text-black dark:text-white">
              Earnest Money
            </p>
            <p className="text-left text-sm font-semibold">
              {expectedByBuyer_earnestMoney}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

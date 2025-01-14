import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import InitiatePropertyPurchase from "../SaleNotation/initiate-property-purchase";
import { isSaleNotationExists } from "@/services/saleNotation";
import { Link } from "react-router-dom";

const SinglePropertyInitiatePurchase = ({
  onInitiatePurchase,
  totalPaymentAmount,
  earnestMoney,
  totalTime,
  totalArea,
  title,
  propertySubtype,
  owner,
  propertyId,
}) => {
  const [isNotationExists, setIsNotationExists] = useState(null);
  const [saleNotationId, setSaleNotationId] = useState("");

  //Check If Sale Notation Exists
  const checkSaleNotation = async () => {
    const res = await isSaleNotationExists(owner, propertyId);
    console.log("res", res);
    if (res) {
      setSaleNotationId(res._id);
      setIsNotationExists(true);
    } else {
      setIsNotationExists(false);
    }
  };

  useEffect(() => {
    checkSaleNotation();
  }, [propertyId]);

  return (
    <div className="mt-6">
      {isNotationExists && isNotationExists ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold">
              View Sale Notation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-black dark:text-white text-sm">
              You already have initiate the property purchase.
            </p>
            <Link to={`/account/sale-notation/${saleNotationId}`}>
              <Button>View Sale Notation</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-left text-xl font-semibold">
              Initiate Purchase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700 text-sm">
              Ready to make an offer for this property?
            </p>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button> Initiate Purchase</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Initiate Purchase</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Card className="w-full p-4 shadow-md">
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        {/* Left Column */}
                        <div>
                          <h6 className="underline underline-offset-4 text-sm font-semibold mb-2">
                            Expected By Seller
                          </h6>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                Total Payment:
                              </span>
                              <span className="text-sm font-medium">
                                {totalPaymentAmount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                Total Time:
                              </span>
                              <span className="text-sm font-medium">
                                {`${totalTime} Days` || "90 Days"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                Earnest Money:
                              </span>
                              <span className="text-sm font-medium">
                                {" "}
                                {`₹ ${earnestMoney} ` || "Not Mentioned"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div>
                          <h6 className="underline underline-offset-4 text-sm font-semibold mb-2">
                            Quick Property Info
                          </h6>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                Total Area:
                              </span>
                              <span className="text-sm font-medium">
                                {`${totalArea} Sq.Ft.`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                Property Name:
                              </span>
                              <span className="text-sm font-medium">
                                {title}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                Sub Type:
                              </span>
                              <span className="text-sm font-medium">
                                {propertySubtype}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="my-4">
                      <CardContent className="py-4">
                        <InitiatePropertyPurchase
                          expectedBySeller_totalPaymentAmount={
                            totalPaymentAmount
                          }
                          expectedBySeller_totalTime={totalTime}
                          expectedBySeller_earnestMoney={earnestMoney}
                          owner={owner}
                          propertyId={propertyId}
                        />
                      </CardContent>
                    </Card>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SinglePropertyInitiatePurchase;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SinglePropertyInitiatePurchase = ({ onInitiatePurchase }) => {
  return (
    <div className="mt-6">
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
          <Button
            className="w-full"
            size="lg"
            onClick={onInitiatePurchase}
            variant="default"
          >
            Initiate Purchase
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinglePropertyInitiatePurchase;

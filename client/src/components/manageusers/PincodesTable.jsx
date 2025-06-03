import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  assignedBrokerPins,
  assignedLawyerPins,
  assignPincodeToBroker,
  assignPincodeToLawyer,
  fetchPincodes,
} from "@/services/getPincodesApi";
import { Button } from "../ui/button";

export const PincodesTable = ({ country, state, city, userId, role }) => {
  const [takenLawyerPins, setTakenLawyerPins] = useState(null);
  const [takenBrokerPins, setTakenBrokerPins] = useState(null);

  const [pincodes, setPincodes] = useState([]);
  const [selectedPincodes, setSelectedPincodes] = useState({});

  useEffect(() => {
    const getPincodes = async () => {
      try {
        const res = await fetchPincodes(country, state, city);
        if (res?.places) {
          setPincodes(res.places);
        }
      } catch (error) {
        console.error("Error fetching pincodes:", error);
      }
    };

    if (country && state && city) getPincodes();
  }, [country, state, city]);

  // Function to handle checkbox change
  const handlePincodeSelection = (pincode) => {
    setSelectedPincodes((prevSelected) => ({
      ...prevSelected,
      [pincode]: !prevSelected[pincode], // Toggle the selection
    }));

    console.log("SELECTED PINCODES ARE: ", selectedPincodes);
  };

  //Assign pincode to user profile
  const assignPinToBroker = async () => {
    const res = await assignPincodeToBroker(userId, selectedPincodes);
  };
  //Assign pincode to user profile
  const assignPinToLawyer = async () => {
    const res = await assignPincodeToLawyer(userId, selectedPincodes);
  };

  //Fetch Assigned Pins To Lawyer
  const lawyersAlreadyAssignedPins = async () => {
    const res = await assignedLawyerPins();

    setTakenLawyerPins(res);
  };

  //Fetch Assigned Pins To  Broker
  const brokerAlreadyAssignedPins = async () => {
    const res = await assignedBrokerPins();

    setTakenBrokerPins(res);
  };

  useEffect(() => {
    if (role === "Broker") {
      brokerAlreadyAssignedPins();
    } else {
      lawyersAlreadyAssignedPins();
    }
  }, []);

  return (
    <div>
      {pincodes.length > 0 ? (
        <div className="max-h-60 overflow-y-auto border rounded-lg">
          <Table className="w-full">
            <TableCaption>
              List of pincodes for {city}, {state}, {country}.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%]">City</TableHead>
                <TableHead className="w-[33%]">Pincode</TableHead>
                <TableHead className="w-[33%]">Assign Pincode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pincodes.map((pincode) => (
                <TableRow key={pincode["post code"]}>
                  <TableCell className="font-medium">
                    {pincode["place name"]}
                  </TableCell>
                  <TableCell>{pincode["post code"]}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={!!selectedPincodes[pincode["post code"]]}
                      onChange={() =>
                        handlePincodeSelection(pincode["post code"])
                      }
                    />

                    {role === "Broker" ? "Broker" : "Lawyer"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-gray-500 text-center p-4">
          No pincodes found for {city}, {state}, {country}.
        </div>
      )}

      {/* Debugging Output */}
      <pre className="mt-4 p-2 border rounded-md bg-gray-100">
        Selected Pincodes:{" "}
        {JSON.stringify(
          Object.keys(selectedPincodes).filter((key) => selectedPincodes[key]),
          null,
          2
        )}
      </pre>

      {/* Assign Pincodes */}
      <div className="flex justify-center my-4">
        {role === "Broker" ? (
          <Button onClick={assignPinToBroker}>Assign Pincode To Broker</Button>
        ) : (
          <Button onClick={assignPinToLawyer}>Assign Pincodes To Lawyer</Button>
        )}
      </div>
    </div>
  );
};

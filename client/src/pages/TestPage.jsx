import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import LocationSelector from "./LocationSelector";
import useAssignedPincodes from "../hooks/useAssignedPincodes";
import axios from "axios";

const TestPage = () => {
  return <LocationSelector />;
};

export default TestPage;

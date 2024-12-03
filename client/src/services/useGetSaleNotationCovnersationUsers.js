import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

const useGetSaleNotationCovnersationUsers = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [saleNotationConvoUsers, setSaleNotationConvoUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCon = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/saleNotation/get-users`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.status === 200) {
          setSaleNotationConvoUsers(res.data.data);
        } else {
          console.log("Failed to fetch users");
        }
      } catch (error) {
        console.log("Unable to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCon();
  }, [authToken]);

  return { saleNotationConvoUsers, loading };
};

export default useGetSaleNotationCovnersationUsers;

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";
import { API_URL } from "./api";

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useContext(authContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/user/manage-users`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authToken]);

  return { users, loading, error };
};

export default useGetAllUsers;

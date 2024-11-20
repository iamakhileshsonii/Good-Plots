import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useContext(authContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/user/manage-users`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
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

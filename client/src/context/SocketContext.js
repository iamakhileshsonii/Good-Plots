import { useState, createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { authContext } from "./authContext";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useContext(authContext);

  useEffect(() => {
    if (authUser && authUser._id) {
      const socket = io("http://localhost:3001", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("connect", () => {});

      socket.on("disconnect", () => {});

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Listen for SaleNotation real-time messages
      socket.on("receiveSaleNotationMessage", (message) => {
        // Handle the incoming SaleNotation message
        console.log("SaleNotation message received:", message);
        // You can store or update this message in your component state for display
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider };

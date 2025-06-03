import { createContext, useContext, useEffect, useState } from "react";
import { login as authLogin } from "@/services/authServices";
import { logout as authLogout } from "@/services/authServices";
import { checkAuth } from "@/services/authServices";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();
  const navigate = useNavigate();

  //Check Auth
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await checkAuth();
        if (res) {
          setAuthUser(res.data);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setAuthUser(null);
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Unable to check auth");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Login
  const handleLogin = async (email, password) => {
    try {
      const res = await authLogin(email, password);

      if (res) {
        toast({
          title: "Logged In",
          description: "User logged in successfully",
        });
        navigate("/account/explore-properties");
        setAuthUser(res.user); // Assuming `res.user` contains user details
        setIsAuthenticated(true);
      } else {
        toast({
          title: "Unable to login",
          description: "Something went wrong",
        });
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Unable to login the user", error);
      toast({
        title: "Error",
        description: "Failed to login",
      });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const res = await authLogout();

      if (res) {
        toast({
          title: "Logged Out",
          description: "Visit again",
        });
        navigate("/");
        setAuthUser(null);
        setIsAuthenticated(false);
      } else {
        toast({
          title: "Unable to logout",
          description: "Something went wrong",
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Unable to logout the user", error);
      toast({
        title: "Error",
        description: "Failed to logout",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        logout: handleLogout,
        authUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

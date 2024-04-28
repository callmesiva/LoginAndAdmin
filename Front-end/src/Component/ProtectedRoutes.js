import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import URL from "../Component/Utills/ConstUrl";

const ProtectedRoute = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = localStorage.getItem("token");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`${URL}/roleverify`, {
          headers: {
            Authorization: auth,
          },
        });
        setAccessGranted(true);
        setIsLoading(false);
      } catch (error) {
        setAccessGranted(false);
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [auth]);

  if (!auth) {
    return (
      <h2 className="text-center italic m-5">Access Denied Please Login !</h2>
    );
  }

  if (!isLoading) {
    if (accessGranted) {
      return <Outlet />;
    } else if (!accessGranted) {
      return (
        <h2 className="text-center italic m-5">You Dont Have Admin Access !</h2>
      );
    }
  } else if (isLoading) {
    return <h2 className="text-center italic m-5">Loading....</h2>;
  }
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import URL from "../Component/Utills/ConstUrl";
import axios from "axios";

const MailVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async () => {
        await axios.get(`${URL}/verify/${token}`);
      })();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <p className="text-center mt-10 text-lg italic">
      Verifing your mail address please wait....
    </p>
  );
};

export default MailVerify;

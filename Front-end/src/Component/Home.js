import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../Component/Utills/ConstUrl";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function getData() {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(`${URL}/getdata`, {
        headers: {
          Authorization: token,
        },
      });
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) getData();
    else navigate("/");
  }, []);
  return (
    <>
      <div className=" flex justify-end mt-3 mr-7 gap-4">
        <button
          className="p-1 border-2 rounded-md"
          onClick={() => navigate("/home/admin")}
        >
          Admin
        </button>
        <button
          className="p-1 border-2 rounded-md"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="mx-auto w-[250px] h-[350px] my-10 border-[1px] shadow-md rounded-md">
        <p className="text-center mt-2">Welcome</p>
        <img className="size-48 mx-auto my-1" src={data?.image} alt=""></img>
        <div className="mt-4 flex flex-col ml-7 gap-2">
          <p>Name : {data?.name}</p>
          <p>Email : {data?.email}</p>
          <p>Number : {data?.number}</p>
        </div>
      </div>
    </>
  );
};

export default Home;

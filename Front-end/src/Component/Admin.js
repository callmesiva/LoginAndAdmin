import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../Component/Utills/ConstUrl";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(`${URL}/admindata`, {
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
    getData();
  }, []);
  return (
    <>
      <div className=" flex justify-end mt-3 mr-7 gap-4">
        <button
          className="p-1 border-2 rounded-md"
          onClick={() => navigate("/home")}
        >
          Home
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

      <p className="text-center mt-2">Welcome</p>
      <div className="flex flex-wrap justify-start gap-5 mx-20 ">
        {data.map((item) => {
          return (
            <div
              key={item._id}
              className="w-[250px] h-[350px] border-[1px] shadow-md rounded-md"
            >
              <img
                className="size-48 mx-auto my-1"
                src={item?.image}
                alt=""
              ></img>
              <div className="mt-4 flex flex-col ml-7 gap-2">
                <p>Name : {item?.name}</p>
                <p>Email : {item?.email}</p>
                <p>Number : {item?.number}</p>
                <p>Role : {item?.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Admin;

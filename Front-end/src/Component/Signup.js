import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../Component/Utills/ConstUrl";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [CnfPassword, setCnfPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [IsMailSend, setIsMailSend] = useState(false);
  const ImageRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let SignUp = async (e) => {
    e.preventDefault();
    try {
      if (password !== CnfPassword) throw new Error("Password mismatched");
      setIsLoading(true);
      let response = await axios.post(`${URL}/signup`, {
        name,
        email,
        number,
        image,
        role,
        password,
      });

      setIsMailSend(true);
      setTimeout(() => setIsMailSend(false), 2000);
      setIsLoading(false);
      setName("");
      setEmail("");
      setNumber("");
      ImageRef.current.value = "";
      setCnfPassword("");
      setPassword("");
    } catch (error) {
      setIsLoading(false);
      alert(`Failed to signup - ${error?.response?.data?.message}`);
      setIsLoading(false);
      setName("");
      setEmail("");
      setNumber("");
      ImageRef.current.value = "";
      setCnfPassword("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-3 m-3">
        {IsMailSend && <h4>Verification Mail Sent Successfully</h4>}
      </div>

      <form
        className="bg-white border-2 rounded px-8 py-2 mb-4"
        onSubmit={SignUp}
      >
        <div className="p-2 text-center font-semibold text-xl">
          <h2>SignUp</h2>
        </div>
        <div className="mb-3">
          <input
            className="w-60 shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-60 shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-60 shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            type="tel"
            placeholder="Mobile Number"
            pattern="[6-9][0-9]{9}"
            title="Please enter a 10-digit mobile number starting with 6,7,8 and 9"
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            ref={ImageRef}
            className="w-60 shadow border rounded py-[5px] px-3 text-gray-700 focus:outline-none"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <select
            className="w-60 shadow border rounded py-[5px] px-3 text-gray-700 focus:outline-none"
            value={role}
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            className="w-60 shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            required
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-60 shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            id="password"
            type="password"
            placeholder="Confirm Password"
            value={CnfPassword}
            required
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
            onChange={(e) => setCnfPassword(e.target.value)}
          />
        </div>

        {isLoading ? (
          <button className="bg-[rgb(8,109,221)] hover:bg-[#6b98da] text-white font-bold py-2 px-4 rounded w-full">
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-2 w-4 h-4  animate-spin text-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#8fce00"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            className="bg-[rgb(8,109,221)] hover:bg-[#6b98da] text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            SignUp
          </button>
        )}
      </form>
      <div>
        <button
          className="border-2 border-blue-400 bg-[#92b9f4] hover:bg-light-blue-200 h-10 w-64 rounded-md"
          onClick={() => navigate("/")}
        >
          Have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Signup;

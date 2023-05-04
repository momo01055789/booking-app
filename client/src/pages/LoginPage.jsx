import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../userContext";
import axios from "axios";

const LoginPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://booking-app-hky1.onrender.com/login",
        {
          email,
          password,
        }
      );
      setUser(data);
      setRedirect(true);
    } catch (err) {
      console.log("login failed");
    }
  };

  if (redirect) {
    navigate("/");
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className="max-w-2xl mx-auto " onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

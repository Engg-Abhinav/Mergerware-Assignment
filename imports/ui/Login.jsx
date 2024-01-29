import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    Meteor.call("users.login", { email, password}, (error, res) => {
      if (error) {
        console.error("Error login user:", error.reason);
        alert(error.reason)
      } else {
        console.log("User created successfully");
        localStorage.setItem("role", res.role);
        localStorage.setItem("email", email)
        navigate("/");
      }
    });
  };

  return (
    <div className="bg-blue-100 h-dvh w-dwh flex justify-center items-center mx-5 md:mx-0">
      <div className="bg-white p-5 rounded-lg w-full md:w-[25%] shadow-lg">
        <h1 className="text-2xl text-center text-blue-700">Welcome user!</h1>
        <form
          className="h-full w-full flex flex-col justify-center"
          onSubmit={(e) => handelSubmit(e)}
        >
          <p className="text-center text-blue-600 mt-[3rem] mb-[1rem]">Login</p>
          <input
            className="mt-4 px-4 py-2 border border-blue-300 rounded-lg"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mt-4 mb-4 px-4 py-2 border border-blue-300 rounded-lg"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-3 flex justify-between items-center">
            <Link to='/signup' className="text-blue-600 hover:text-blue-700">Signup</Link>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white mt-[2rem] px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Let's go!
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

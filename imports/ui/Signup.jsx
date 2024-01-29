import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    Meteor.call("users.signup", { email, role, password}, (error) => {
      if (error) {
        console.error("Error creating user:", error.reason);
      } else {
        console.log("User created successfully");
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        navigate("/");
      }
    });
  };

  return (
    <div className="bg-blue-100 h-dvh flex mx-5 md:mx-0 justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-full md:w-[25%] shadow-lg">
        <h1 className="text-2xl text-center text-blue-700">Create Account</h1>
        <form
          className="h-full w-full flex flex-col justify-center"
          onSubmit={(e) => handelSubmit(e)}
        >
          <p className="text-center text-blue-600 mt-[1rem] mb-[1rem]">Signup</p>
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
            {/* Radio buttons for role selection */}
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Admin"
                required
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="ml-2 text-blue-600">Admin</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Borrower"
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="ml-2 text-blue-600">Borrower</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Lender"
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="ml-2 text-blue-600">Lender</label>
            </div>
          </div>
          <Link to="/login" className="font-light mx-3 my-4 text-blue-600 hover:text-blue-700">Login?</Link>
          <button
            type="submit"
            className="bg-blue-600 text-white mt-[1rem] px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Let's go!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

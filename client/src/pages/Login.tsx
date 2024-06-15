import React, { useState } from "react";
import "./../styles/Login.css";
import Icons from "../components/Icons";
import Mascot from "./Mascot";
import { BASE_URL, token } from "../utils/config";
import axios from "axios";

export default function Login() {
  const [email] = useState<string>("");
  const [password] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const checkLogin = async (email: string, password: string) => {
    return axios.post(
      `${BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid.");
      return;
    }

    setError(null);
    console.log("Logging in with", email, password);
    // Here, you would typically send the credentials to the server for authentication.
  };
  return (
    <div className="content">
      <div className="login-container">
        <div className="logo-section">
          <Mascot />
          <h1>Welcome to Real AI</h1>
          <p>
            The first Intelligent Agent Assistant customer service platform for
            customers and agents
          </p>
        </div>
        <div className="form-section">
          <div className="title">
            <h2>Login</h2>
            <hr className="awok" />
          </div>
          <form onSubmit={handleSubmit} className="form-login">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" />
              <p id="error-email" className="error-message"></p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" />
              <p id="error-password" className="error-message"></p>
            </div>
            <div className="rem-for">
              <span className="rem">
                <input type="checkbox" className="rem-check" />
                <h5>Remember me</h5>
              </span>
              <span>
                <a href="/">Forgot Password</a>
              </span>
            </div>
            <button>
              Login
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZFJREFUaEPtmQFuwjAMRf1vMm4ybjJOMnYS2EnGTeAmWT2lUkmaGlynJJMrIZBQHL//7TRNQZ1f6Dx/coBXO+gO/CsHQghvRPRJRO9ExL8trhsR8ecAgL/vLrMSislfLTJeiLFLISwBToNSH5UBvgAcp3NYAoTKyXP4G4DdJgAYpLIACiHcCZPGNZmEE5Um0sJIcR1gVFZSyh2ICngPlEpBKqFhMTmma/gjZSXF3ayJYyK8FdjPbQm0wpgBSGpOlHwKYjMHngD4u6MS0fcjJdUqwMib7W1SIVoHGN0o9sVqgDSAVCrK/4t90QtAsS96AmAIfuo6T13sBWB8ZLz02MQXAPuebmTTXM8ADkuNv7qElKtKNmxmNcvqfW6uFgGK9f5SAEmp+P9ivbcOcJLqvWkAbS9Jzpptp6WJHMCfiYUa8BIqCCQJY9nEfLRu9U6g5HfVw90tjtezvZOlA6z+T0UXMvXZJjMADhbf0rATDGNZTvyQwwcA9V4xaW9Ua8eZOrA2Gc14B9CoZjnGHbBUUxPrFwrWMUAeawVjAAAAAElFTkSuQmCC" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

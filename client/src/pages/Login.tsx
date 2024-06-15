import { useState } from "react";
import "./../styles/Login.css";
import Mascot from "./Mascot";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/general.tsx/Button";
import useLogin from "../service/useLogin";

type FieldValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const loginMutation = useLogin();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    loginMutation.mutate({ email: value.email, password: value.password });
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
          <form onSubmit={handleSubmit(onSubmit)} className="form-login">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email", { required: true })} />
              <p id="error-email" className="error-message"></p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
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
            <Button disabled={isLoading}>
              Login
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZFJREFUaEPtmQFuwjAMRf1vMm4ybjJOMnYS2EnGTeAmWT2lUkmaGlynJJMrIZBQHL//7TRNQZ1f6Dx/coBXO+gO/CsHQghvRPRJRO9ExL8trhsR8ecAgL/vLrMSislfLTJeiLFLISwBToNSH5UBvgAcp3NYAoTKyXP4G4DdJgAYpLIACiHcCZPGNZmEE5Um0sJIcR1gVFZSyh2ICngPlEpBKqFhMTmma/gjZSXF3ayJYyK8FdjPbQm0wpgBSGpOlHwKYjMHngD4u6MS0fcjJdUqwMib7W1SIVoHGN0o9sVqgDSAVCrK/4t90QtAsS96AmAIfuo6T13sBWB8ZLz02MQXAPuebmTTXM8ADkuNv7qElKtKNmxmNcvqfW6uFgGK9f5SAEmp+P9ivbcOcJLqvWkAbS9Jzpptp6WJHMCfiYUa8BIqCCQJY9nEfLRu9U6g5HfVw90tjtezvZOlA6z+T0UXMvXZJjMADhbf0rATDGNZTvyQwwcA9V4xaW9Ua8eZOrA2Gc14B9CoZjnGHbBUUxPrFwrWMUAeawVjAAAAAElFTkSuQmCC" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

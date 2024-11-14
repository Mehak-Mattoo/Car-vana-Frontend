import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import AlertComponent from "./Alert";
import notesContext from "../context/Note/notesContext";

const host = process.env.PRODUCTION_URL;

function Login(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const context = useContext(notesContext);
  const { handleShowAlert } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    if (!navigator.onLine) {
      handleShowAlert("No Internet Connection !", "red");
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const response = await fetch(`${host}api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    setLoader(false);
    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/");
      handleShowAlert("Logged In Successfully", "green");
    } else {
      navigate("/login");
      handleShowAlert("Wrong Credentials", "red");
    }
  };
  return (
    <div className="container my-7 mx-auto flex justify-around">
      <div className="animation hidden lg:block">
        <lottie-player
          src="https://lottie.host/28e6a39b-7385-4e4b-affb-1ca243601f49/9Cmv7Q7wbz.json"
          background="transparent"
          speed="1"
          style={{ width: "600px", height: "500px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      <div className="card">
        <Card className="mt-10" color="transparent" shadow={false}>
          <Typography
            className="dark:text-white"
            variant="h4"
            color="blue-gray"
          >
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal dark:text-white">
            Enter your details to login.
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-12 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6 dark:text-white">
              <Input
                className="dark:text-white"
                onChange={handleChange}
                id="email"
                name="email"
                value={credentials.email}
                size="lg"
                label="Email"
                required
              />
              <Input
                className="dark:text-white"
                onChange={handleChange}
                id="password"
                name="password"
                value={credentials.password}
                type="password"
                size="lg"
                label="Password"
                required
              />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              {loader ? (
                <div className="flex justify-center">
                  <Spinner className="h-4 w-4" />
                </div>
              ) : (
                "Login"
              )}
            </Button>
            <Typography
              color="gray"
              className="mt-4 text-center font-normal dark:text-white"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
        <AlertComponent
          showAlert={props.showAlert}
          handleShowAlert={props.handleShowAlert}
          setShowAlert={props.setShowAlert}
        />
      </div>
    </div>
  );
}

export default Login;

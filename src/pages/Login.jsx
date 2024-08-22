import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid.";
    }

    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    }

    return formErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      console.log("handleLogin triggered");
      console.log("Email: ", email);

      // send the form data to the local storage
      localStorage.setItem("email", email);

      toast.success("Successfully Logged In!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

      // reset the form
      setEmail("");
      setPassword("");
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/img/login-bg.jpg')] p-5 md:p-0">
      <div className="md:min-w-[700px] md:min-h-[500px] p-3 md:p-0 flex items-center justify-center rounded-md login-blur">
        <div className="w-full h-full flex justify-center items-center rounded-md">
          <Card color="transparent" shadow={false}>
            <img
              src="/img/logo.png"
              alt=""
              width={200}
              className="mx-auto mb-3"
            />
            <Typography className="text-center text-4xl text-white font-[1000]">
              Log In
            </Typography>
            <Typography className="mt-1 font-normal text-center text-[#a0a0a0]">
              Nice to meet you! Enter your details to login.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <div className="relative">
                  <Typography
                    variant="h6"
                    color="white"
                    className="mb-1 font-normal"
                  >
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className="!border-t-blue-gray-200 focus:!border-[#199bff] text-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <Typography className="text-red-800 text-sm mt-1 absolute">
                      {errors.email}
                    </Typography>
                  )}
                </div>
                <div className="relative">
                  <Typography
                    variant="h6"
                    color="white"
                    className="mb-1 font-normal"
                  >
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-[#199bff] text-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {errors.password && (
                    <Typography className="text-red-800 text-sm mt-1 absolute">
                      {errors.password}
                    </Typography>
                  )}
                </div>
              </div>
              <Button
                onClick={handleLogin}
                className="mt-6 text-lg flex items-center justify-center gap-2 hover:bg-[#199bff] transition-all duration-500"
                fullWidth
              >
                <span>log in</span>
                <lord-icon
                  src="https://cdn.lordicon.com/vduvxizq.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff"
                  style={{ width: "30px", height: "30px" }}
                ></lord-icon>
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

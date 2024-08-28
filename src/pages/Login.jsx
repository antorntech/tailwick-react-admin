import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  // Optimized validation function
  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        if (!value) {
          errorMessage = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Email address is invalid.";
        }
        break;
      case "password":
        if (!value) {
          errorMessage = "Password is required.";
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters.";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const validateForm = () => {
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    const newErrors = {
      ...(emailError && { email: emailError }),
      ...(passwordError && { password: passwordError }),
    };

    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const regEmail = "admin@gmail.com";
      const regPassword = "125125";

      if (email === regEmail && password === regPassword) {
        // Store email in localStorage
        localStorage.setItem("email", email);

        // Display success message
        toast.success("Successfully Logged In!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to home after 1 second
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setErrors({
          ...(email !== regEmail && { email: "Email is invalid." }),
          ...(password !== regPassword && { password: "Password is invalid." }),
        });
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);

    // Clear error when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/img/login-bg.jpg')] p-5 md:p-0">
      <div className="w-full md:max-w-[700px] md:max-h-[500px] p-3 md:p-0 flex items-center justify-center rounded-md login-blur">
        <div className="w-full h-full flex justify-center items-center rounded-md">
          <Card
            color="transparent"
            shadow={false}
            className="bg-opacity-50 backdrop-filter backdrop-blur-lg p-6"
          >
            <img
              src="/img/logo.png"
              alt="Logo"
              width={200}
              className="mx-auto mb-4"
            />
            <Typography className="text-center text-4xl text-white font-bold mb-2">
              Log In
            </Typography>
            <Typography className="mb-8 font-normal text-center text-[#a0a0a0]">
              Nice to meet you! Enter your details to login.
            </Typography>
            <form
              onSubmit={handleLogin}
              className="w-80 max-w-screen-lg sm:w-96 mx-auto px-5"
            >
              <div className="mb-6">
                <div className="relative mb-4">
                  <Typography
                    variant="h6"
                    color="white"
                    className="mb-1 font-normal"
                  >
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@gmail.com"
                    className="!border-t-blue-gray-200 focus:!border-[#199bff] text-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={email}
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <Typography className="text-red-800 text-sm mt-1 absolute">
                      {errors.email}
                    </Typography>
                  )}
                </div>
                <div className="relative mb-4">
                  <Typography
                    variant="h6"
                    color="white"
                    className="mb-1 font-normal mt-6"
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
                    name="password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <Typography className="text-red-800 text-sm mt-1 absolute">
                      {errors.password}
                    </Typography>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="py-2 mt-10 text-md flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-500"
                fullWidth
              >
                <span>Log In</span>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [showSignInError, setShowSignInError] = useState(false);
  const [signInErrormsg, setSignInErrormsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successmsg, setSuccessmsg] = useState("");
  const signIn = useSignIn()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLogINSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login/", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (responseData.success === true) {
        signIn({
          tokin:responseData.accessToken,
          expiresIn:3600,
          tokenType:"Bearer",
          authState:{username : inputs.username}
        })
        navigate("/home");
      } else {
        setShowSignInError(true);
        setSignInErrormsg("Missing Username or Password");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const checkPasswordStrength = (password) => {
      const minLength = 6;
      const minUpperCase = 1;
      const minLowerCase = 1;
      const minNumbers = 1;

      if (password.length < minLength) {
        setShowError(true);
        setErrormsg("Password must be at least 8 characters long.");
        return;
      }

      if (password.replace(/[^A-Z]/g, "").length < minUpperCase) {
        setShowError(true);
        setErrormsg("Password must contain at least one uppercase letter.");
        return;
      }

      if (password.replace(/[^a-z]/g, "").length < minLowerCase) {
        setShowError(true);
        setErrormsg("Password must contain at least one lowercase letter.");
        return;
      }

      if (password.replace(/[^0-9]/g, "").length < minNumbers) {
        setShowError(true);
        setErrormsg("Password must contain at least one number.");
        return;
      }
      setErrormsg("");
      return; // Password meets all criteria
    };

    if (
      !inputs.firstName ||
      !inputs.lastName ||
      !inputs.username ||
      !inputs.password ||
      !inputs.conPassword ||
      !inputs.email ||
      !inputs.phone
    ) {
      setShowError(true);
      setErrormsg("Please enter all the fields");
      return;
    }

    if (inputs.password !== inputs.conPassword) {
      setShowError(true);
      setErrormsg("the passwords are not the same!");
      return;
    }

    checkPasswordStrength(inputs.password);

    if (errormsg!=="") {
      return;
    }
    try {

      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessmsg("signup succeeded");
      setShowSuccess(true);
      setInputs(() => ({ X: "" }));
      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <div>
      <h1 className="mainTittle">Wellcome to MyArticle Website</h1>
      <div className="Basecounter">
        {showLogIn ? (
          <div className="Login">
            <div className="LoginTittle">
              <h2>Log In</h2>
            </div>
            <div className="LoginForm">
              <form onSubmit={handleLogINSubmit}>
                <div className="OneForm">
                  <label>User Name: </label>
                  <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="OneForm">
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                {showSignInError && (
                  <h4 className="errorMSG">{signInErrormsg}</h4>
                )}
                <button
                  type="submit"
                  className="btn"
                  onClick={handleLogINSubmit}
                >
                  Log IN
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="showsigninbtn">
            <button
              className="Showbtn"
              onClick={() => {
                setShowLogIn(true);
                setShowSignUp(false);
              }}
            >
              Log In
            </button>
          </div>
        )}
        {showSignUp ? (
          <div className="Register">
            <div className="RegisterTittle">
              <h2>Sign Up</h2>
            </div>
            <div className="RegisterForm">
              <form onSubmit={handleSignUpSubmit}>
                <div className="OneForm">
                  <label>First Name: </label>
                  <input
                    type="text"
                    name="firstName"
                    value={inputs.firstName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="OneForm">
                  <label>Last Name: </label>
                  <input
                    type="text"
                    name="lastName"
                    value={inputs.lastName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="OneForm">
                  <label>User Name: </label>
                  <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="OneForm">
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="OneForm">
                  <label>Confirm Password: </label>
                  <input
                    type="password"
                    name="conPassword"
                    value={inputs.conPassword || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="OneForm">
                  <label>Email: </label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="OneForm">
                  <label>phone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={inputs.phone || ""}
                    onChange={handleChange}
                  />
                </div>

                {showError && <h4 className="errorMSG">{errormsg}</h4>}
                {showSuccess && <h4 className="successMSG">{successmsg}</h4>}

                <button
                  type="submit"
                  className="btn"
                  onClick={handleSignUpSubmit}
                >
                  Sign UP
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="showsignupbtn">
            <button
              className="Showbtn"
              onClick={() => {
                setShowLogIn(false);
                setShowSignUp(true);
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

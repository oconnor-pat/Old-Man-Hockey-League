import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

// Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f2f2f2;
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 100px;
  color: #447bbe;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledLoginButton = styled.button`
  margin-right: 10px;
  height: 35px;
  width: 100px;
  border-radius: 10px;
  background-color: #447bbe;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const StyledRegisterButton = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 10px;
  background-color: #b11313;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://bew-584382a4b042.herokuapp.com";

function LandingPage() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleRegistration = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 201) {
        // Registration successful
        const data = await response.json();
        console.log("User registered:", data);
        // Optionally, you can navigate to another page here
        navigate("/homefeed");
      } else {
        // Registration failed
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false); // Hide the registration form
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false); // Hide the login form
    setShowRegisterForm(true);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (showLoginForm) {
      // Handle login form submission
      try {
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginData.username,
            password: loginData.password,
          }),
        });

        if (response.status === 200) {
          // Login successful
          const userData = await response.json();
          console.log("Login successful:", userData);
          // navigate to another page here
          navigate("/homefeed");
        } else if (response.status === 404) {
          console.error("User not found");
        } else if (response.status === 401) {
          console.error("Incorrect password");
        } else {
          console.error("Unexpected error", await response.text());
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else if (showRegisterForm) {
      handleRegistration(event); // Calls the registration function for registration
    }
  };

  // Separate onChange handlers for each input field in the registration form
  const handleRegistrationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationData({
      ...registrationData,
      name: e.target.value,
    });
  };

  const handleRegistrationEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationData({
      ...registrationData,
      email: e.target.value,
    });
  };

  const handleRegistrationUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationData({
      ...registrationData,
      username: e.target.value,
    });
  };

  const handleRegistrationPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationData({
      ...registrationData,
      password: e.target.value,
    });
  };

  // Separate onChange handlers for each input field in the login form
  const handleLoginUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({
      ...loginData,
      username: e.target.value,
    });
  };

  const handleLoginPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  };

  return (
    <div>
      <StyledTitle>Welcome to WEB</StyledTitle>
      <StyledButtonContainer>
        <StyledLoginButton onClick={handleLoginClick}>Login</StyledLoginButton>
        <StyledRegisterButton onClick={handleRegisterClick}>
          Register
        </StyledRegisterButton>
      </StyledButtonContainer>

      {showLoginForm && (
        <StyledForm onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleLoginUsernameChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginPasswordChange}
            required
          />
          <br />
          <input type="submit" value="Login" />
        </StyledForm>
      )}

      {showRegisterForm && (
        <StyledForm onSubmit={handleRegistration}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={registrationData.name}
            onChange={handleRegistrationNameChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registrationData.email}
            onChange={handleRegistrationEmailChange}
            required
          />
          <br />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={registrationData.username}
            onChange={handleRegistrationUsernameChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registrationData.password}
            onChange={handleRegistrationPasswordChange}
            required
          />
          <br />
          <input type="submit" value="Register" />
        </StyledForm>
      )}
    </div>
  );
}

export default LandingPage;

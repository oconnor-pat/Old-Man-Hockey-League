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

function LandingPage() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    // Make an HTTP request to register the user with registrationData
    try {
      const response = await fetch("/auth/register", {
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (showLoginForm) {
      // Handle login form submission
      const loginSuccessful = await performLogin(); // Replace with your login logic

      if (loginSuccessful) {
        navigate("/homefeed");
      }
    } else if (showRegisterForm) {
      // Handle registration form submission
      handleRegistration(); // Use the handleRegistration function to submit the registration form
    }
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
        <StyledForm onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <input type="submit" value="Login" />
        </StyledForm>
      )}

      {showRegisterForm && (
        <StyledForm onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={registrationData.name}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registrationData.email}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registrationData.password}
            onChange={handleInputChange}
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

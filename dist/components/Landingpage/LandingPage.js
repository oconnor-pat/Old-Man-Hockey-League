import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
// Styled Components
const StyledForm = styled.form `
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
const StyledTitle = styled.h1 `
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 100px;
  color: #447bbe;
`;
const StyledButtonContainer = styled.div `
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const StyledLoginButton = styled.button `
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
const StyledRegisterButton = styled.button `
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
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8001";
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
    const handleRegistration = async (event) => {
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
            }
            else {
                // Registration failed
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
            }
        }
        catch (error) {
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
    const handleLogin = async (event) => {
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
                }
                else if (response.status === 404) {
                    console.error("User not found");
                }
                else if (response.status === 401) {
                    console.error("Incorrect password");
                }
                else {
                    console.error("Unexpected error", await response.text());
                }
            }
            catch (error) {
                console.error("Error during login:", error);
            }
        }
        else if (showRegisterForm) {
            handleRegistration(event); // Calls the registration function for registration
        }
    };
    // Separate onChange handlers for each input field in the registration form
    const handleRegistrationNameChange = (e) => {
        setRegistrationData({
            ...registrationData,
            name: e.target.value,
        });
    };
    const handleRegistrationEmailChange = (e) => {
        setRegistrationData({
            ...registrationData,
            email: e.target.value,
        });
    };
    const handleRegistrationUsernameChange = (e) => {
        setRegistrationData({
            ...registrationData,
            username: e.target.value,
        });
    };
    const handleRegistrationPasswordChange = (e) => {
        setRegistrationData({
            ...registrationData,
            password: e.target.value,
        });
    };
    // Separate onChange handlers for each input field in the login form
    const handleLoginUsernameChange = (e) => {
        setLoginData({
            ...loginData,
            username: e.target.value,
        });
    };
    const handleLoginPasswordChange = (e) => {
        setLoginData({
            ...loginData,
            password: e.target.value,
        });
    };
    return (_jsxs("div", { children: [_jsx(StyledTitle, { children: "Welcome to Old Man Hockey League" }), _jsxs(StyledButtonContainer, { children: [_jsx(StyledLoginButton, { onClick: handleLoginClick, children: "Login" }), _jsx(StyledRegisterButton, { onClick: handleRegisterClick, children: "Register" })] }), showLoginForm && (_jsxs(StyledForm, { onSubmit: handleLogin, children: [_jsx("label", { htmlFor: "username", children: "Username:" }), _jsx("input", { type: "username", id: "username", name: "username", value: loginData.username, onChange: handleLoginUsernameChange, required: true }), _jsx("br", {}), _jsx("label", { htmlFor: "password", children: "Password:" }), _jsx("input", { type: "password", id: "password", name: "password", value: loginData.password, onChange: handleLoginPasswordChange, required: true }), _jsx("br", {}), _jsx("input", { type: "submit", value: "Login" })] })), showRegisterForm && (_jsxs(StyledForm, { onSubmit: handleRegistration, children: [_jsx("label", { htmlFor: "name", children: "Name:" }), _jsx("input", { type: "text", id: "name", name: "name", value: registrationData.name, onChange: handleRegistrationNameChange, required: true }), _jsx("br", {}), _jsx("label", { htmlFor: "email", children: "Email:" }), _jsx("input", { type: "email", id: "email", name: "email", value: registrationData.email, onChange: handleRegistrationEmailChange, required: true }), _jsx("br", {}), _jsx("label", { htmlFor: "username", children: "Username:" }), _jsx("input", { type: "text", id: "username", name: "username", value: registrationData.username, onChange: handleRegistrationUsernameChange, required: true }), _jsx("br", {}), _jsx("label", { htmlFor: "password", children: "Password:" }), _jsx("input", { type: "password", id: "password", name: "password", value: registrationData.password, onChange: handleRegistrationPasswordChange, required: true }), _jsx("br", {}), _jsx("input", { type: "submit", value: "Register" })] }))] }));
}
export default LandingPage;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
//Styled Components
const StyledDiv = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B11313;
  width: 100%;
  height: 50px;
`;
const StyledUl = styled.ul `
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 800px;
  list-style: none;
  padding-top: 15px;

  li {
    a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;

      &:hover {
        box-shadow: 0 0 10px #B11313;
        color: #447BBE;
    }
  }
`;
const StyledIcon = styled.i `
  font-size: 2rem;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Navbar() {
    return (_jsx(StyledDiv, { children: _jsxs(StyledUl, { children: [_jsx("li", { children: _jsx(Link, { to: "/", children: _jsx(StyledIcon, { className: "bi bi-house" }) }) }), _jsx("li", { children: _jsx(Link, { to: "/discover", children: _jsx(StyledIcon, { className: "bi bi-search" }) }) }), _jsx("li", { children: _jsx(Link, { to: "/profile", children: _jsx(StyledIcon, { className: "bi bi-person" }) }) })] }) }));
}
export default Navbar;

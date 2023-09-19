import { useState } from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import NewPostModel from "../NewPost/NewPostModel";

//Styled Components
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  width: 100%;
  height: 50px;
`;

const StyledUl = styled.ul`
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

const StlyedNewPostButton = styled.button`
  margin-left: 20px;
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

const StyledIcon = styled.i`
  font-size: 2rem;
`;

//Interface
interface NavbarProps {
  // TODO
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar: React.FC<NavbarProps> = (_props) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const openModel = () => {
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const handleNewPost = (content: string) => {
    // Implement how you want to handle the new post (e.g., send it to Homefeed)
    console.log("New post content:", content);
  };

  return (
    <StyledDiv>
      <StlyedNewPostButton onClick={openModel}>New Post</StlyedNewPostButton>
      <StyledUl>
        <li>
          <Link to="/">
            <StyledIcon className="bi bi-house"></StyledIcon>
          </Link>
        </li>
        <li>
          <Link to="/discover">
            <StyledIcon className="bi bi-search"></StyledIcon>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <StyledIcon className="bi bi-person"></StyledIcon>
          </Link>
        </li>
      </StyledUl>
      <NewPostModel
        isOpen={isModelOpen}
        onClose={closeModel}
        onSubmit={handleNewPost}
      />
    </StyledDiv>
  );
};

export default Navbar;

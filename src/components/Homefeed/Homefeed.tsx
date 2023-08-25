import { /*React,*/ useState } from "react";
import styled from "styled-components";

//Types
interface StyledPostBoxProps {
  focused?: boolean;
}

interface Post {
  id: number;
  content: string;
}

//Styled Components
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const StlyedHomefeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 50%;
  padding-right: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

const StyledPostBox = styled.div<StyledPostBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #B11313;
  width: 100%;
  height: 100px;
  padding-left: 20px;
  border-radius: 2px;
  border: 1px solid #fff;
  margin-bottom: 20px;

  p {
    color: #fff;
    align-self: flex-start;
  }

  h4 {
    color: #00FFFF;
    font-size: 1.2rem;
    align-self: flex-start;
    font-weight: bold;
  }

  ${(props) =>
    props.focused &&
    `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height 300px;
    z-index: 1;
    box-shadow: 0 0 10px #447BBE;
    `}

  &:hover {
    box-shadow: 0 0 10px #447BBE;
  `;

const StyledSpidey = styled.img`
  height: auto;
  width: 100%;
  align-self: flex-start;
`;

const StyledSpideySelfieContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  flex-direction: column;
`;

const StyledBanner = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #447bbe;
  opacity: 0.9;
  color: #fff;

  div {
    display: flex;
    justify-content: space-between;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
`;

const StyledProfileBio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  margin-top: 10px;
  padding-left: 20px;
  padding-top: 20px;
  background-color: #161616;
  border-radius: 10px;
`;

// I dont know why these don't work yet. Update: I figured it out.
const StyledNYCWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNYCImage = styled.img`
  height: auto;
  width: 100%;
`;

const StyledWeather = styled.p`
  font-size: 1.2rem;
  color: #fff;
`;

//Dummy data
const posts: Post[] = [
  { id: 1, content: "Post 1 content" },
  { id: 2, content: "Post 2 content" },
  { id: 3, content: "Post 3 content" },
  { id: 4, content: "Post 4 content" },
  { id: 5, content: "Post 5 content" },
  { id: 6, content: "Post 6 content" },
];

function Homefeed() {
  const [focusedPost, setFocusedPost] = useState<number | null>(null);

  //Function to handle when a user clicks on a post
  const handlePostClick = (postIndex: number) => {
    setFocusedPost(focusedPost === postIndex ? null : postIndex);
  };

  return (
    <>
      <StyledContainer>
        <StlyedHomefeed>
          <StyledTitle>Homefeed</StyledTitle>
          {posts.map((_post, index) => (
            <StyledPostBox
              key={index}
              focused={focusedPost === index} //pass focus state to the styled component
              onClick={() => handlePostClick(index)} //pass click handler to the styled component
            >
              <h4>Username</h4>
              <p>{_post.content}</p>
            </StyledPostBox>
          ))}
          ;
          <br />
        </StlyedHomefeed>
        <StyledSpideySelfieContainer>
          <StyledSpidey
            src="../src/assets/images/spideyman.webp"
            alt="spidey"
          />
          <StyledBanner>
            <div>
              <img src="../src/assets/images/avatar.jpeg" alt="spideyboy" />
              <p>Spider-Man</p>
              <p>15.3 million followers</p>
            </div>
            <StyledProfileBio>
              <h3>@NYCWallCrawler</h3>
              <p>
                The official account of your friendly neighborhood web-slinger,
                Spider-Man!
              </p>
              <br />
              <p>
                Whether it's trying to save the world, or a cat from a tree...
                I'll be there!
              </p>
            </StyledProfileBio>
          </StyledBanner>
          <StyledNYCWeatherContainer>
            <StyledNYCImage src="../src/assets/images/NYC.webp" alt="NYC" />
            <StyledWeather>NYC: Weather</StyledWeather>
          </StyledNYCWeatherContainer>
        </StyledSpideySelfieContainer>
      </StyledContainer>
    </>
  );
}

export default Homefeed;

//import React from 'react'
import styled from "styled-components";

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

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #B11313;
  width: 100%;
  height: 100px;
  padding-left: 20px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 0 10px #447BBE;
  `;

const StyledSpidey = styled.img`
  height: auto;
  width: 100%;
`;

const StyledSpideySelfieContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
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

function Homefeed() {
  return (
    <>
      <StyledContainer>
        <StlyedHomefeed>
          <StyledTitle>Homefeed</StyledTitle>
          <StyledPost>
            <p>TODO: Add posts here</p>
          </StyledPost>
          <br />
          <StyledPost>
            <p>TODO: Add posts here</p>
          </StyledPost>
          <br />
          <StyledPost>
            <p>TODO: Add posts here</p>
          </StyledPost>
          <br />
          <StyledPost>
            <p>TODO: Add posts here</p>
          </StyledPost>
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
              <h3>NYCWallCrawler</h3>
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
        </StyledSpideySelfieContainer>
      </StyledContainer>
    </>
  );
}

export default Homefeed;

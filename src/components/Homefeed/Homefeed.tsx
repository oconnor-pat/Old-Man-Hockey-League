import { useState, useEffect } from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

//Interfaces
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

const StyledNewPostButton = styled.button`
  margin-top: 20px;
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

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  margin-right: 20px;
  margin-top: 20px;
`;

const StyledSubmitButton = styled.button`
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

const StyledCancelButton = styled.button`
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

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`;

const StyledEditAndDeleteButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: -12px;
`;

const StyledEditButton = styled.button`
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

const StyledDeleteButton = styled.button`
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

function Homefeed() {
  const [focusedPost, setFocusedPost] = useState<number | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]); // State to store user posts
  const [newPostContent, setNewPostContent] = useState(""); // State to store new post content

  useEffect(() => {
    // Retrieve user posts from local storage when the component mounts
    const storedPosts = localStorage.getItem("userPosts");

    // If user posts exist in local storage, set the userPosts state to the stored posts
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setUserPosts(parsedPosts);
    }
  }, []);

  const savePostsToLocalStorage = (posts: Post[]) => {
    // Save user posts to local storage
    localStorage.setItem("userPosts", JSON.stringify(posts));
  };

  //Function to handle when a user clicks on a post
  const handlePostClick = (postIndex: number) => {
    setFocusedPost(focusedPost === postIndex ? null : postIndex);
  };

  // Function to handle when the "New Post" button is clicked
  const handleNewPostButtonClick = () => {
    setIsCreatingPost(true);
  };

  // Function to handle when the content of the new post changes
  const handleNewPostContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewPostContent(event.target.value);
  };

  const handleCreatePost = () => {
    // Create a new post object with a unique ID (you can use libraries like uuid for this)
    const newPost: Post = {
      id: userPosts.length + 1,
      content: newPostContent,
    };

    // Save the new post to local storage
    const updatedPosts = [...userPosts, newPost];
    setUserPosts(updatedPosts);

    // Save the updated posts to local storage
    savePostsToLocalStorage(updatedPosts);

    // Add the new post to the userPosts state
    setUserPosts([...userPosts, newPost]);

    // Close the model and reset the state
    setIsCreatingPost(false);

    // Clear the new post content
    setNewPostContent("");
  };

  const handleCancelPost = () => {
    setIsCreatingPost(false);
    setNewPostContent("");
  };

  return (
    <>
      {/* "New Post" button */}
      <StyledNewPostButton onClick={handleNewPostButtonClick}>
        New Post
      </StyledNewPostButton>
      <StyledContainer>
        <StlyedHomefeed>
          <StyledTitle>Homefeed</StyledTitle>
          {userPosts.map((Post, index) => (
            <StyledPostBox
              key={Post.id} // uses post id as key
              focused={focusedPost === index} //pass focus state to the styled component
              onClick={() => handlePostClick(index)} //pass click handler to the styled component
            >
              <h4>Username</h4>
              <p>{Post.content}</p>
              <StyledEditAndDeleteButtonsContainer>
                <StyledEditButton>Edit</StyledEditButton>
                <StyledDeleteButton>Delete</StyledDeleteButton>
              </StyledEditAndDeleteButtonsContainer>
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
                The official social media account of your friendly neighborhood
                web-slinger, Spider-Man!
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

      {/* Model for creating a new post */}
      {isCreatingPost && (
        <StyledPostBox focused>
          <StyledTextArea
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={handleNewPostContentChange}
          />
          <StyledButtonsContainer>
            <StyledSubmitButton onClick={handleCreatePost}>
              Submit
            </StyledSubmitButton>
            <StyledCancelButton onClick={handleCancelPost}>
              Cancel
            </StyledCancelButton>
          </StyledButtonsContainer>
        </StyledPostBox>
      )}
    </>
  );
}

export default Homefeed;

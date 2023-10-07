import { useState, useEffect } from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { WEATHER_API_URL } from "../../api";

//Interfaces
interface StyledPostBoxProps {
  focused?: boolean;
}

interface Post {
  id: number;
  content: string;
}

interface WeatherData {
  description: string;
  temp: number;
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

const StyledBanner = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #447bbe;
  opacity: 0.9;
  color: #fff;
  visibility: hidden;
  transition: visibility 0s opacity 0.3s ease;
  pointer-events: none;

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

const StyledSpideySelfieContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  flex-direction: column;

  &:hover ${StyledBanner} {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
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
  border: 2px solid #447bbe;
  flex-direction: row;
  align-items: center;
`;

const StyledNYCImage = styled.img`
  border: 2px solid #447bbe;
  width: 50%;
  height: auto;
`;

const StyledWeather = styled.p`
  font-size: 1.2rem;
  color: #fff;
  margin-top: 10px;
  text-align: center;
  width: 50%;
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

  &:hover {
    box-shadow: 0 0 10px #447bbe;
  }
`;

// Helper function to get the weather icon based on the weather description
function getWeatherIcon(description: string) {
  switch (description.toLowerCase()) {
    case "clear sky":
      return <i className="bi bi-brightness-high"></i>;
    case "few clouds":
      return <i className="bi bi-cloud-sun"></i>;
    case "scattered clouds":
    case "broken clouds":
    case "overcast clouds":
      return <i className="bi bi-cloud"></i>;
    case "rain":
    case "light rain":
      return <i className="bi bi-cloud-rain"></i>;

    default:
      return <i className="bi bi-question-circle"></i>;
  }
}

function Homefeed() {
  const [focusedPost, setFocusedPost] = useState<number | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false); // State to track if the user is creating a new post
  const [userPosts, setUserPosts] = useState<Post[]>([]); // State to store user posts
  const [newPostContent, setNewPostContent] = useState(""); // State to store new post content
  const [editingPost, setEditingPost] = useState<Post | null>(null); // State to store the post being edited
  const [editedContent, setEditedContent] = useState(""); // State to store the edited post content
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // State to store the weather data

  useEffect(() => {
    // Retrieve user posts from local storage when the component mounts
    const storedPosts = localStorage.getItem("userPosts");

    // If user posts exist in local storage, set the userPosts state to the stored posts
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setUserPosts(parsedPosts);
    }
  }, []);

  useEffect(() => {
    //Fetch current weather data from OpenWeather API
    fetch(`${WEATHER_API_URL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Extract the weather description and temperature from the API response
        const weatherDescription = data.list[0].weather[0].description;
        const temperature = Math.round(data.list[0].main.temp);

        // Update the weather data state with the weather description and temperature
        setWeatherData({
          description: weatherDescription,
          temp: temperature,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, []);

  const savePostsToLocalStorage = (posts: Post[]) => {
    // Save user posts to local storage
    localStorage.setItem("userPosts", JSON.stringify(posts));
  };

  //Function to handle when a user clicks on a post
  const handlePostClick = (postIndex: number) => {
    if (focusedPost === postIndex) {
      // Close the edit mode if the post is already focused
      setFocusedPost(null);
    } else {
      // Open the edit mode and populate the textarea with the post content
      setFocusedPost(postIndex);
      setNewPostContent(userPosts[postIndex].content);
    }
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

  // Function to handle deleting a post
  const handleDeletePost = (postId: number) => {
    // Filter out the post to be deleted from the userPosts array
    const updatedPosts = userPosts.filter((post) => post.id !== postId);

    // Save the updated posts to local storage
    savePostsToLocalStorage(updatedPosts);

    // Update the userPosts state to remove the deleted post
    setUserPosts(updatedPosts);

    // Close the edit mode if the deleted post was focused
    if (focusedPost === postId) {
      setFocusedPost(null);
    }
  };

  const handleEditButtonClick = (post: Post) => {
    setEditingPost(post);
    setEditedContent(post.content);
  };

  const handleSaveEditedPost = (postId: number) => {
    const updatedPosts = userPosts.map((post) =>
      post.id === postId ? { ...post, content: editedContent } : post
    );

    // Save the updated posts to local storage
    savePostsToLocalStorage(updatedPosts);

    // Update the userPosts state
    setUserPosts(updatedPosts);

    // Clear editing state
    setEditingPost(null);
    setEditedContent("");
  };

  const handleCancelEdit = () => {
    // Clear editing state
    setEditingPost(null);
    setEditedContent("");
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
          {userPosts.map((post) => (
            <StyledPostBox
              key={post.id}
              focused={editingPost?.id === post.id}
              onClick={() => handlePostClick(post.id)}
            >
              <h4>Username</h4>
              {editingPost?.id === post.id ? (
                // Render text box for editing
                <>
                  <StyledTextArea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <StyledButtonsContainer>
                    <StyledSubmitButton
                      onClick={() => handleSaveEditedPost(post.id)}
                    >
                      Save
                    </StyledSubmitButton>
                    <StyledCancelButton onClick={() => handleCancelEdit()}>
                      Cancel
                    </StyledCancelButton>
                  </StyledButtonsContainer>
                </>
              ) : (
                // Render post content and edit/delete buttons in view mode
                <>
                  <p>{post.content}</p>
                  <StyledEditAndDeleteButtonsContainer>
                    <StyledEditButton
                      onClick={() => handleEditButtonClick(post)}
                    >
                      Edit
                    </StyledEditButton>
                    <StyledDeleteButton
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </StyledDeleteButton>
                  </StyledEditAndDeleteButtonsContainer>
                </>
              )}
            </StyledPostBox>
          ))}
          <br />
        </StlyedHomefeed>
        <StyledSpideySelfieContainer>
          <StyledSpidey src="/assets/images/spideyman.webp" alt="spidey" />
          <StyledBanner>
            <div>
              <img src="/assets/images/avatar.jpeg" alt="spideyboy" />
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
            <StyledNYCImage src="/assets/images/NYC.webp" alt="NYC" />
            {weatherData && (
              <StyledWeather>
                New York: {weatherData.description}
                {getWeatherIcon(weatherData.description)} {weatherData.temp}°F
              </StyledWeather>
            )}
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

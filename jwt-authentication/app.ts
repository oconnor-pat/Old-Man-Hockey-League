import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { User } from "./models/user";

// Create the express app and import the type of app from express;
const app: Application = express();

// Cors
app.use(cors());

//configure env;
dotenv.config();

// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Declare The PORT
const PORT: number = 8000;
app.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

// Listen the server
app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on http:localhost//${PORT}`);

  // Connect To The Database
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("🛢️ Connected To Database");
  } catch (error) {
    console.log("⚠️ Error connecting to database");
  }
});

// User API to register account
app.post("/auth/register", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;
    // ** destructure the information from user;
    const { name, email, password } = user;
    // ** Check the email all ready exist in database or not ;
    // ** Import the user model from "./models/user";
    const EmailAlreadyExists = await User.findOne({
      email: email,
    });
    // ** Add a condition if the user exist we will send the response as email all ready exist
    if (EmailAlreadyExists) {
      res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
      return;
    }
    // ** if not create a new user ;
    // !! Don't save the password as plain text in db . I am saving just for demonstration.
    // ** You can use bcrypt to hash the plain password.
    // now create the user;
    const newUser = await User.create({
      name,
      email,
      password,
    });
    // Send the newUser as response;
    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error) {
    // console the error to debug
    console.log(error);
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: "Failed to create new user. Please try again",
    });
  }
});

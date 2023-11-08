"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "https://bew-584382a4b042.herokuapp.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
// CORS
app.use((0, cors_1.default)(corsOptions));
// Configure env
dotenv_1.default.config();
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// PORT
const PORT = process.env.PORT || 8000;
// Check server availability
app.get("/check", (req, res) => {
    // Return a 200 status if the server is available
    res.sendStatus(200);
});
// Listen for the server on PORT
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🗄️ Server Fire on http://localhost:${PORT}`);
    // Connect to Database
    try {
        const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/Web";
        yield mongoose_1.default.connect(databaseURL);
        console.log("🛢️ Connected To Database");
    }
    catch (error) {
        console.log("⚠️ Error connecting to the database:", error);
    }
}));
// User API to register account
app.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user data from the request body
        const user = req.body;
        // Destructure the information from the user
        const { name, email, username, password } = user;
        // Check if the email already exists in the database
        const emailAlreadyExists = yield user_1.User.findOne({
            email: email,
        });
        const usernameAlreadyExists = yield user_1.User.findOne({
            username: username,
        });
        if (emailAlreadyExists) {
            return res.status(400).json({
                status: 400,
                message: "Email already in use",
            });
        }
        if (usernameAlreadyExists) {
            return res.status(400).json({
                status: 400,
                message: "Username already in use",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });
        return res.status(201).json({
            status: 201,
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        console.error("Error while registering user:", error);
        return res.status(500).json({
            status: 500,
            message: "Failed to create a new user. Please try again",
        });
    }
}));
// User API to login
app.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_1.User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Incorrect password",
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Login successful",
            user,
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            status: 500,
            message: "Failed to process the login request",
        });
    }
}));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  getPlace,
  getPlaces,
  photosArray,
  savePlace,
  updatePlace,
  uploadPhoto,
} from "./controllers/form.js";
import {
  allPlaces,
  getUser,
  login,
  logout,
  register,
} from "./controllers/user.js";
import cookieParser from "cookie-parser";
import path from "path";
import url from "url";
import { BookPlace, getBookedPlace } from "./controllers/booking.js";

// To acces __dirname inside ES module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

const photosMiddleware = multer({ dest: "Uploads/" });

// Middleware
app.use("/uploads", express.static(__dirname + "/Uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

mongoose.set("strictQuery", "false");
mongoose.connect(process.env.MONGO_URL);
console.log("Connected to mongoDB");

// Routes
app.post("/upload-by-link", uploadPhoto);
app.post("/upload", photosMiddleware.array("photos", 100), photosArray);
app.post("/save-places", savePlace);
app.put("/save-place", updatePlace);
app.get("/user-places", getPlaces);
app.get("/places", allPlaces);
app.get("/places/:id", getPlace);
app.post("/bookings", BookPlace);
app.get("/booked-place", getBookedPlace);
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/profile", getUser);

app.use("/", (req, res) => {
  res.send("Hello from node");
});

app.listen(3001, () => {
  console.log("server is running from node js");
});

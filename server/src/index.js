const express = require("express"),
  app = express(),
  { PORT, CLIENT_URL } = require("./constants"),
  cookieParser = require("cookie-parser"),
  passport = require("passport"),
  cors = require("cors");

// import passport middleware
require("./middlewares/passportMiddleware");

// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// import routes
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");

// initialize routes
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);

// app Start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The application is running on PORT:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();

const express = require("express"),
  app = express(),
  { PORT, CLIENT_URL } = require("./src/constants"),
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

// initialize routes
app.use("/api", userRoutes);

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

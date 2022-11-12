const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// routes
const userRouter = require("./routes/userRoute");
const voteRouter = require("./routes/voteRoute");

const app = express();

// 1) MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(compression());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/polls", voteRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

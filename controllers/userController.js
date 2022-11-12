const User = require("../models/userModel");
const util = require("util");
const jwt = require("jsonwebtoken");

// Creating api token
const signToken = (id) => {
  return jwt.sign({ id: id }, "polls-super-secure-secret");
};

// Sign up
exports.signUp = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  const { email, _id, firstName, lastName } = newUser;
  const user = { email, _id, firstName, lastName };

  res.status(201).json({
    status: "success",
    token,
    user,
  });
};

// Login
exports.signIn = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  // 1) Check if email and password exist
  if (!userEmail || !userPassword) {
    res.send("Please provide email and password");
    return next();
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: userEmail }).select("+password");

  if (!user || !(await user.correctPassword(userPassword, user.password))) {
    res.send("Incorrect email or password.");
    return next();
  }

  // 3) If everything is ok, send token to client
  const token = signToken(user._id);

  const { firstName, lastName, email, _id } = user;

  const currentUser = { firstName, lastName, email, _id };

  res.status(200).json({
    status: "success",
    token,
    user: currentUser,
  });
};

// protect route
exports.protect = async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.send("You are not signed in! Please sign in to get access.");
    return next();
  }

  // 2) Validate token
  const decodedPayLoad = await util.promisify(jwt.verify)(
    token,
    "polls-super-secure-secret"
  );

  // 3) Check if user still exists
  const user = await User.findById(decodedPayLoad.id);

  if (!user) {
    res.send("User no longer exists.");
    return next();
  }

  // Grant access to route
  req.user = user;
  next();
};

require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://evangel:polls@polls.dhrsx5i.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("DB connection successful");
  });

const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

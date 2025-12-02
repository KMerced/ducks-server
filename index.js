const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://KMerced:4NNIZIslq6kF3t@duckdb.ysozaqy.mongodb.net/")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);

    const schema = new mongoose.Schema({
        name: String,
    });
  });

  async function createMessage() {
    const result = await MessageChannel.save();
    console.log(result);
  }
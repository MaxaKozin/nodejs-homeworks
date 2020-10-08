const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    avatarURL: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    verificationToken: String,
    token: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("User", userSchema);
  }

  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  findUserByQuery = async (query) => {
    return await this.db.findOne(query);
  };

  findUserById = async (id) => {
    return await this.db.findById(id);
  };

  updateUser = async (userId, newData) => {
    return await this.db.findByIdAndUpdate(userId, newData, { new: true });
  };
}

module.exports = new User();

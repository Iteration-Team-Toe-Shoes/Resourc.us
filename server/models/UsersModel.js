const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const options = {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
};

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    // userSchema
    firstName: {
      type: String,
      required: [true, "can't be blank"],
    }, // firstname
    lastName: {
      type: String,
      required: [true, "can't be blank"],
    }, // lastname
    emailAddress: {
      type: String,
      required: [true, "can't be blank"],
      // unique: true,
      // index: true,
    }, // email
    googleId: {
      type: String,
    },
    teamsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teams",
      },
    ],
    password: {
      type: String,
      // required: [true, "can't be blank"],
      // min: [8, 'Not enough characters']
    },
  },
  options,
);

UsersSchema.pre("save", async function (next) {
  // eslint-disable-next-line no-unused-vars
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UsersSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UsersModel = mongoose.model("Users", UsersSchema);
module.exports = UsersModel;

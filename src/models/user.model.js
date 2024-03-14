import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //to make field(here field is username) searchable in optimized way(It is quite expensive in performance)
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //cloudinary url
      required: true,
    },

    coverImage: {
      type: String, //cloudinary url
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//This is a mongoose middleware, and it will be called just before saving the data to the mongoDB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName
    },

    process.env.ACCESS_TOKEN_SECRET,

    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },

    process.env.REFRESH_TOKEN_SECRET,

    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", userSchema);

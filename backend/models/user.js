import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// static signup method
userSchema.statics.signup = async function (email, username, password) {

    // validation
    if(!email || !password || !username) {
        throw new Error("Email, username and password are required");
    }
    if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }

    let exists = await this.findOne({ email });

    if(exists) {
        throw new Error("Email already exists");
    }

    exists = await this.findOne({ username });
    if(exists) {
        throw new Error("Username already exists");
    }

    // generates a random string to be used as salt -> to be added at the end of the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });

    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {

    // validation
    if(!email || !password) {
        throw new Error("Email and password are required");
    }
    if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }

    const user = await this.findOne({ email });

    if(!user) {
        throw new Error("Email does not exist");
    }

    const auth = await bcrypt.compare(password, user.password);

    if(!auth) {
        throw new Error("Password is incorrect");
    }

    return user;
};

export default mongoose.model("User", userSchema);
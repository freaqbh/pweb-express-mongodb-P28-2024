import { userInterface } from "../models/user.models";
import bcrypt from "bcrypt";
import User from "../models/user.models"; 

interface newUser {
    username: string;
    password: string;
}

interface login {
    username: string;
    password: string;
}

export type { newUser, login };

export const auth = {
    async register({ username, password }: newUser) {
        try {
            // Ensure the username is unique before creating the user
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error("Username is already taken");
            }

            // Encrypt password and save user
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            return newUser;
        } catch (error) {
            console.error("Error registering user:", error);
            throw new Error("Could not register user");
        }
    },
    async login({ username, password }: login) {
        try {
            const user = await User.findOne({ username });
            if (!user) throw new Error("User not found");

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error("Invalid password");

            const token = await user.generateAuthToken();
            return { token, user: user.toJSON() }; // Return token and sanitized user info
        } catch (error) {
            console.error("Error logging in user:", error);
            throw new Error("Could not login user");
        }
    },
};

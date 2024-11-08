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
            
            if (!User.db) throw new Error("Database connection error");

           
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error("Username is already taken");
            }

          
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            return newUser;
        } catch (error) {
            console.error("Error registering user:", (error as Error).message || error);
            throw new Error("Could not register user. Please try again.");
        }
    },

    async login({ username, password }: login) {
        try {
            
            if (!User.db) throw new Error("Database connection error");

            
            const user = await User.findOne({ username });
            if (!user) throw new Error("User not found");

            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error("Invalid password");

           
            const token = await user.generateAuthToken();
            return { token, user: user.toJSON() };
        } catch (error) {
            console.error("Error logging in user:", (error as Error).message || error);
            throw new Error("Could not log in user. Please try again.");
        }
    },
};

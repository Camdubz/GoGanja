import User from "../models/User.js"
import {createError} from "../utils/error";
import {compare, hash, genSalt} from 'bcryptjs';

export const register = async (req, res, next) => {
    try {
        const salt = genSalt(10);
        const hashedPassword = hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).send("User has been created!")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const username = req.body.username;

        const user = User.findOne({ username });

        if (!user) {
            return next(createError(404, 'User was not found'));
        }

        if (!await compare(req.body.password, user.password)) {
            return next(createError(400, 'Incorrect password'));
        }

        return res.status(200).send('Login success')
    } catch (e) {
       next(e);
    }
}

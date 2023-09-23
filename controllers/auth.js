import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//login means authenticate if user is same or not
// if you are not able to understand code please
// mail :meetketanmehta@gmail.com
// make post request to http://localhost:8800/api/auth/login with username and password after register

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
    // Create a new user with the hashed password
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword, // Store the hashed password in the database
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id, username: username, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).json({ token: token });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'User not exist , please Sign Up' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed bcrypt' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // you can also get the details of user by token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('err in jwt verify');
        // return res.status(401).json({ message: 'Authentication failed: Invalid token' });
      }
      console.log('user data after jwt token decryption', decoded);
    });

    // Respond with the token
    res.status(200).json({ token: token });
  } catch (err) {
    next(err);
  }
};

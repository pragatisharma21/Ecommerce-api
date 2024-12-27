import User from "../Model/user.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userData = req.user;
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { userName } = req.query;

    if (!userName) {
      return res.status(400).json({ message: "Username is required." });
    }

    const users = await User.find({
      username: { $regex: userName, $options: "i" },
    });

    if (users.length > 0) {
      return res.status(200).json({ message: "Users found", users });
    } else {
      return res.status(404).json({ message: "No users found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users", error });
  }
};

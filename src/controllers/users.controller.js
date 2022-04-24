import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(404).json({ message: "user doesn´t exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credetnials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.userId },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "ups something whent wrong" });
  }
  res.json("received");
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(411).json({ message: "the user email is alredy used" });
    }
    if (password !== passwordConfirm) {
      return res
        .status(410)
        .json({ message: "the two passwords of the user dont match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let newUser = await User.create(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
      {
        fields: ["firstName", "lastName", "email", "password"],
      }
    );
    res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { userId: id } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;

//     const result = await pool.query(
//       "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
//       [title, description, id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: "Task not found" });

//     return res.json(result.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.destroy({
      where: {
        userId: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

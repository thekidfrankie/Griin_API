import { User } from "../models/User.model.js";


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
    const { uuid } = req.params;
    const user = await User.findOne({ where: { uuid: uuid } });
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


export const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: {uuid:uuid}
    });
    user.set(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const result = await User.destroy({
      where: {
        uuid: uuid,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

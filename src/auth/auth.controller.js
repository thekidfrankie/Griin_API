import { User } from "../models/User.model.js";
import { RefreshToken } from "../models/RefreshToken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configs } from "../database/config/configForNode.js";

export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(404).json({ message: "user dont exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credetnials" });
    }
    const token = jwt.sign(
      { id: existingUser.userId },
      configs.jwt.secret,
      {
        expiresIn: configs.jwt.jwtExpiration
      }
      );
      let refreshToken = await RefreshToken.createToken(existingUser);
      console.log(configs.jwt.jwtExpiration);
    res
      .status(200)
      .json({
        auth: true,
        result: existingUser,
        token: token,
        refreshToken: refreshToken,
      });
  } catch (error) {
    res.status(500).json({ message: "ups something whent wrong" });
  }
};

  export const createUser = async (req, res) => {
    try {
      const body = req.body.body;
      console.log(body)
      const existingUser = await User.findOne({ where: { email: body.email } });
      if (existingUser) {
        return res.status(411).json({ message: "the user email is alredy used" });
      }
      if (body.password !== body.passwordConfirm) {
        return res
          .status(410)
          .json({ message: "the two passwords of the user dont match" });
      }
      const hashedPassword = await bcrypt.hash(body.password, 12);
      let newUser = await User.create(
        {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hashedPassword,
        },
        {
          fields: ["firstName", "lastName", "email", "password"],
        }
      );
      // const userFirstGoal = await Goal.findOne({where:{uuid:user.goalUuid}});
      // await newUser.addGoal(userFirstGoal);
      console.log(newUser)
      res.json(newUser);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const refreshToken = async (req, res)  => {
    const { refreshToken: requestToken } = req.body;
    console.log(req.body)
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
    try {
      let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
      console.log("hoalhoalhas", refreshToken)
      if (!refreshToken) {
        res.status(403).json({ 
          auth: 4,
          message: "Refresh token is not in database!" });
        return;
      }
      if (RefreshToken.verifyExpiration(refreshToken)) {
        console.log("se destruye el token")
        RefreshToken.destroy({ where: { id: refreshToken.id } });
        
        res.status(403).json({
          auth: 3,
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
      console.log("llegamos antes de sacar el usuario")
      const user = await refreshToken.getUser();
      console.log("llegamos despue de sacar el usuario")
      let newAccessToken = jwt.sign({ id: user.uuid }, configs.jwt.secret, {
        expiresIn: configs.jwt.jwtExpiration,
      });
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };
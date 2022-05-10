import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { configs } from '../database/config/configForNode.js';
export const RefreshToken = sequelize.define(
  "refreshToken",
  {
    token: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

RefreshToken.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + configs.jwt.jwtRefreshExpiration);
  let _token = uuidv4();
  console.log(user.userId)
  let refreshToken = await this.create({
    token: _token,
    userUserId: user.userId,
    expiryDate: expiredAt.getTime(),
  });
  return refreshToken.token;
};

RefreshToken.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};



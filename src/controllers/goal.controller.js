import { Goal } from "../models/Goal.js";
import { Portfolio } from "../models/Portfolio.js";
import { User } from "../models/User.js";

//   id: INTEGER
//   title:STRING
//   description:STRING
//   duration:INTEGER
//   picture:STRING
//   amount:INTEGER
//   portfolioId: INTEGER
//   userUserId: INTEGER

export const createGoal = async (req, res) => {
    try {
      const { id, title, description, duration, picture, amount, portfolioId, userUserId  } = req.body;
      const porfolio = await Portfolio.findOne({where: {id: portfolioId}})
      const user = await User.findOne({where: {id: userUserId}})
      const existingGoal = await Goal.findOne({ where: { id: id } });
      if(!porfolio){
        return res.status(401).json({ message: "the porfolio assigned to the goal dont exist" });
      }
      if(!user){
        return res.status(401).json({ message: "the user assigned to the goal dont exist" });
      }
      if (existingGoal) {
        return res.status(411).json({ message: "the Goal is already created" });
      }
      let newGoal = await Goal.create(
        {
            title: title,
            description: description,
            duration: duration,
            picture: picture,
            amount: amount,
            portfolioId: portfolioId,
            userUserId: userUserId

        },
        {
          fields: ["title", "description", "duration", "picture", "amount"],
        }
      );
      res.json(newGoal);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
import { Goal } from "../models/Goal.model.js";
import { Portfolio } from "../models/Portfolio.model.js";
import { User } from "../models/User.model.js";

//   id: INTEGER
//   title:STRING
//   description:STRING
//   duration:INTEGER
//   picture:STRING
//   amount:INTEGER
//   portfolioId: INTEGER
//   userUuid: INTEGER

export const createGoal = async (req, res) => {
    try {
      const body = req.body;
      const porfolio = await Portfolio.findOne({where: {id: body.portfolioId}})
      const user = await User.findOne({where: {uuid: body.userUuid}})
      // const existingGoal = await Goal.findOne({ where: { id: body.id } });
      if(!porfolio){
        return res.status(401).json({ message: "the porfolio assigned to the goal dont exist" });
      }
      if(!user){
        return res.status(401).json({ message: "the user assigned to the goal dont exist" });
      }
      let newGoal = await Goal.create(
        {
            title: body.title,
            description: body.description,
            duration: body.duration,
            picture: body.picture,
            amount: body.amount,
            
        },
        {
          fields: ["title", "description", "duration", "picture", "amount"],
        }
      );
      await newGoal.setPortfolio(porfolio);
      await user.addGoal(newGoal);
      await newGoal.reload();
      res.json(newGoal);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getAllUserGoals = async (req, res) => {
    try {
      const { uuid } = req.params;
      const user = await User.findOne({where:{uuid:uuid}});
      if(!user){
        return res.status(401).json({message:"User dont exists for that uuid"})
      }
      const allGoals = await Goal.findAll({where:{userUuid:uuid}});
      res.json(allGoals);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const UpdateGoal = async (req, res) => {
    try {
      const { uuid } = req.params;
      const goal = await Goal.findOne({
        where: {uuid:uuid}
      });
      goal.set(req.body);
      await goal.save();
      res.json(goal);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const deleteGoal = async (req, res) => {
    try {
      const { uuid } = req.params;
      const result = await Goal.destroy({
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
  
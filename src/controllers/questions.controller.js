import {Question} from "../models/Question.model.js";

// Model
// "questions":
// {
//   id,
//   type,
//   title,
//   questionContent,
//   answers,
// }

export const createQuestion = async (req, res) => {
  try {
    const { type, title, questionContent, answers } = req.body;

    const existingQuestion = await Question.findOne({
      where: { title: title },
    });
    if (existingUser) {
      return res
        .status(411)
        .json({ message: "the question title alredy exist" });
    }
    let newQuestion = await Question.create(
      {
        type: type,
        title: title,
        questionContent: questionContent,
        answers: answers,
      },
      {
        fields: ["type", "title", "questionContent", "answers"],
      }
    );
    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.findAll();
    res.json(allQuestions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, questionContent, answers } = req.body;

    const result = await Question.findByPk(id);
    result.title = title;
    result.questionContent = questionContent;
    result.answers = answers;
    await result.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Question.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const Ques = require("../models/questionSchema");

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Ques.find();
    res.status(200).json({
      status: "success",
      data: {
        data: questions,
      },
    });
    console.log("Everything is working fine until now");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error,
    });
  }
};

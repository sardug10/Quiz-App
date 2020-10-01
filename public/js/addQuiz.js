// import axios from "axios";

// const { default: Axios } = require("axios");

// adding quiz
const quizForm = document.getElementById("quiz");
const addQueBtn = document.getElementById("addQue");
const addQuizBtn = document.getElementById("addQuiz");

// questions array
let questions = [];

const addQuestion = () => {
  console.log("question is added");
  const answers = [];

  const question = document.querySelector(".question").value;

  let text1 = document.querySelector(".answer1").value;
  let correct1 = document.getElementById("answer1").checked ? true : false;

  answers.push({ text1, correct1 });

  let text2 = document.querySelector(".answer2").value;
  let correct2 = document.getElementById("answer2").checked ? true : false;
  answers.push({ text2, correct2 });

  let text3 = document.querySelector(".answer3").value;
  let correct3 = document.getElementById("answer3").checked ? true : false;
  answers.push({ text3, correct3 });

  let text4 = document.querySelector(".answer4").value;
  let correct4 = document.getElementById("answer4").checked ? true : false;
  answers.push({ text4, correct4 });

  // console.log(answers);
  console.log({ question, answers });
  questions.push({ question, answers });

  document.querySelector(".answer1").value = "";
  document.querySelector(".answer2").value = "";
  document.querySelector(".answer3").value = "";
  document.querySelector(".answer4").value = "";
  document.querySelector(".question").value = "";
};

const submitQuiz = async () => {
  const quizName = document.querySelector(".name").value;
  if (quizName === "") {
    alert("Quiz must have a name.");
    return;
  }

  if (questions.length === 0) {
    alert("Quiz must contain questions.");
    return;
  }

  let cookie = document.cookie;
  cookie = cookie.split("").slice(12, 36).join("");

  console.log({ quizName, questions, cookie });

  try {
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/quiz",
      data: {
        quizName,
        question: questions,
        user: cookie,
      },
    });

    console.log(result);
    if (result.data.status === "Success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

//adding the questions
addQueBtn.addEventListener("click", addQuestion);

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    addQuestion();
  }
});

addQuizBtn.addEventListener("click", submitQuiz);

// const questions = [
//   {
//     question: 'What is 2 + 2?',
//     answers: [
//       { text: '4', correct: true },
//       { text: '22', correct: false }
//     ]
//   }

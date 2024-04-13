const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Madrid", "Berlin"],
    answer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Hamburg", "Munich", "Berlin", "Frankfurt"],
    answer: "Berlin",
  },
  {
    question: "What is the capital of Italy?",
    options: ["Milan", "Venice", "Rome", "Naples"],
    answer: "Rome",
  },
];

let currentQuestion = 0;
let score = 0;
let answersLog = [];

function displayQuestion() {
  const quiz = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const ul = quiz.querySelector("ul");
  const question = questions[currentQuestion];

  questionEl.textContent = question.question;
  ul.innerHTML = "";
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.id = "opt" + index;
    input.value = option;

    const label = document.createElement("label");
    label.htmlFor = "opt" + index;
    label.textContent = option;

    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
  });
}

document.getElementById("submit").addEventListener("click", function () {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const correct = selectedOption.value === questions[currentQuestion].answer;
    answersLog.push({
      question: questions[currentQuestion].question,
      answer: selectedOption.value,
      correct: correct,
    });
    if (correct) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("result").textContent =
        "Your score is: " + score + "/" + questions.length;
      displayReview();
    }
  } else {
    alert("Please select an option.");
  }
});

function displayReview() {
  const review = document.getElementById("review");
  review.innerHTML = "<h3>Review your answers:</h3>";
  answersLog.forEach((log, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Question ${index + 1}: ${
      log.question
    }</strong><br/>
                         Your answer: ${log.answer} <br/>
                         Correct answer: ${questions[index].answer} <br/>
                         ${
                           log.correct
                             ? '<span style="color: green;">Correct</span>'
                             : '<span style="color: red;">Incorrect</span>'
                         }`;
    review.appendChild(div);
  });
}

window.onload = displayQuestion;

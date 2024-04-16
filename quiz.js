const questions = [
  {
    question:
      "What is the primary role of Natural Language Processing in implementation science?",
    options: [
      "To enhance graphical presentations in publications.",
      "To automate the parsing and analysis of scientific literature.",
      "To increase the printing speed of scientific journals.",
      "To improve peer-review processes.",
    ],
    answer: "To automate the parsing and analysis of scientific literature.",
  },
  {
    question: `Which NLP technique is used for grouping text into thematic clusters, as mentioned in the "5335 days of Implementation Science" study?`,
    options: [
      "Text embeddings",
      "Latent Dirichlet Allocation (LDA)",
      "Sentiment Analysis",
      "Neural Networks",
    ],
    answer: "Latent Dirichlet Allocation (LDA)",
  },
  {
    question:
      "What does the use of text embeddings in NLP help to achieve in research synthesis?",
    options: [
      "Decreases the accuracy of text analysis.",
      "Simplifies the peer-review process.",
      "Highlights semantic similarities in texts.",
      "Reduces the need for data visualization.",
    ],
    answer: "Highlights semantic similarities in texts.",
  },
  {
    question:
      "According to the blog, what has been a significant impact of advanced NLP techniques on the analysis of literature?",
    options: [
      "Reduced reliance on digital libraries.",
      "Decreased efficiency in literature analysis.",
      "Identification of trends and insights previously inaccessible.",
      "Lowering the quality of systematic reviews.",
    ],
    answer: "Identification of trends and insights previously inaccessible.",
  },
  {
    question: `What is highlighted as a growing focus within the implementation science field based on the findings from the "5335 days of Implementation Science" study?`,
    options: [
      "Decreasing the number of publications.",
      "Focusing solely on linguistic research.",
      "Increasing importance of systematic reviews.",
      "Shifting away from using NLP techniques.",
    ],
    answer: "Increasing importance of systematic reviews.",
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
                             ? '<span style="color: #1f511f;">Correct</span>'
                             : '<span style="color: #940000;">Incorrect</span>'
                         }`;
    review.appendChild(div);
  });
}

window.onload = displayQuestion;

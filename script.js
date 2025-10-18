const questions = [
  {
    text: "Are you Male or Female?",
    options: ["Male", "Female"]
  },
  {
    text: "What is your age?",
    input: true
  },
  {
    text: "Where do you live?",
    options: ["Earth", "Mars"]
  },
  {
    text: "Are you Alive or Dead?",
    options: ["Alive", "Dead"]
  },
  {
    text: "What is your name?",
    input: true
  }
];

let currentQuestion = 0;
let answers = {};

const questionBox = document.getElementById("question-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const resultLink = document.getElementById("result-link");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");

  if (q.options) {
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        answers[currentQuestion] = opt;
        nextBtn.classList.remove("hidden");
      };
      optionsEl.appendChild(btn);
    });
  } else if (q.input) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type here...";
    input.style.padding = "8px";
    input.style.borderRadius = "8px";
    input.style.width = "90%";
    input.style.border = "1px solid #3b82f6";
    input.oninput = () => {
      answers[currentQuestion] = input.value.trim();
      nextBtn.classList.toggle("hidden", input.value.trim() === "");
    };
    optionsEl.appendChild(input);
  }
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  questionBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const gender = answers[0];
  const age = parseInt(answers[1]);

  let link = "#";
  if (gender === "Male") link = "https://youtube.com/shorts/5abGMJVM99o?si=kdcNM6mS7LYC1vey";
  else if (gender === "Female" && age < 20) link = "https://youtube.com/shorts/oCwUxkA_jXQ?si=z7adaMfcJWQnQ_tr";
  else if (gender === "Female" && age >= 20) link = "https://youtu.be/GlOQnsVOa2o?si=1YFejrp7XrrfEfpI";

  resultLink.href = link;
}

showQuestion();

import flags from "../data/data.json" assert { type: "json" };
import shuffle from "./shuffle.js";
import hideButton from "./hideButton.js";

let correctCounter = 0;
let correctScore = 0;
document.getElementById("correctScore").innerText = correctScore;
let incorrectCounter = 0;
let incorrectScore = 0;
document.getElementById("incorrectScore").innerText = incorrectScore;

let questions = flags.map((state) => state.name);
// console.log(questions);

function createFlags() {
  hideButton();
  shuffle(flags);

  flags.forEach((flag) => {
    const img = flag.flag;
    // create div tag
    const bTag = document.createElement("button");
    bTag.type = "button";
    bTag.onclick = checkAnswer;
    // bTag.id= flags.name;
    bTag.value = flag.name;
    bTag.className =
      "p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer";
    // create img tag
    const image = document.createElement("img");
    image.src = "img/states/" + img;
    image.setAttribute("name", flag.name);
    image.setAttribute("alt", flag.name + " flag");
    image.style = "width:150px;height:100px;";
    image.className = "rounded-lg w-full h-full mx-auto border border-gray-200";
    bTag.append(image);
    document.getElementById("flags").appendChild(bTag);
  });
}

function showQuestion(array) {
  let q = array[Math.floor(Math.random() * questions.length)];
  document.getElementById("questionText").innerText = q;
}

function checkAnswer() {
  let value = this.value;
  // console.log(value);
  if (value == document.getElementById("questionText").innerHTML) {
    correctCounter++;
    correctScore = correctCounter.toString();
    document.getElementById("correctScore").innerText = correctScore;
    removeQuestion(value);
    // console.log("YES", correctCounter);
  } else {
    incorrectCounter++;
    incorrectScore = incorrectCounter.toString();
    document.getElementById("incorrectScore").innerText = incorrectScore;
    // console.log("NO", incorrectCounter);
  }
  hideButton();
}

let answered = [];
function removeQuestion(value) {
  answered.push(value);
  let newQuestions = questions.filter(function (item) {
    return !answered.includes(item);
  });
  showQuestion(newQuestions);
}

let restart = document.getElementById("startGame");
restart.addEventListener("click", function () {
  document.getElementById("correctScore").innerText = "0";
  document.getElementById("incorrectScore").innerText = "0";
  answered.length = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  removeFlags();
  createFlags();
  showQuestion(questions);
});

function removeFlags() {
  let e = document.getElementById("flags");
  e.replaceChildren();
}

createFlags();
showQuestion(questions);

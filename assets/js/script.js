//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let contactSubmit = document.getElementById("submit");

let highScore = document.getElementById("highScore");
let openContact = document.getElementById("openContact");
let contactModal = document.getElementById("contactModal");
let highScoreModal = document.querySelector(".high-score-modal");
let closeScore = document.querySelector(".closeScore");
let closeContact = document.querySelector(".closeContact");
let emailAlert = document.querySelector("#email-success-alert");
let closeEmailAlert = document.querySelector(".close-alert");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let user = document.getElementById("userName");
const quizArray = [
  {
    id: "0",
    question: "What is the capital of Sweden?",
    options: ["Kiruna", "Malmö", "Gothenburg", "Stockholm"],
    correct: "Stockholm",
  },
  {
    id: "1",
    question: "How many people are there in Sweden?",
    options: ["5,5 million", "20 million", "8 million", "10,5 million"],
    correct: "10,5 million",
  },
  {
    id: "2",
    question: "What is the fourth largest city in Sweden?",
    options: ["Lund", "Luleå", "Gothenburg", "Uppsala"],
    correct: "Uppsala",
  },
  {
    id: "3",
    question: "What is the highest mountain in Sweden?",
    options: ["Sarektjåkka", "Kebenekaise", "Storberget", "Vikingaberget"],
    correct: "Kebenekaise",
  },
  {
    id: "4",
    question: "How many lakes are there in Sweden?",
    options: ["70,0000", "15,000", "100,000", "5,000"],
    correct: "100,000",
  },
  {
    id: "5",
    question: "Wich is the Southernmost point in Sweden?",
    options: [
      "Smygehuk",
      "Southern Bridge of Ystad",
      "Sandhammaren",
      "Treriksröset",
    ],
    correct: "Smygehuk",
  },
  {
    id: "6",
    question: "Who is the current King of Sweden?",
    options: [
      "Magnus Stenbock",
      "Gustav Vasa",
      "Carl XVI Gustaf",
      "Fredrick I of Sweden",
    ],
    correct: "Carl XVI Gustaf",
  },
  {
    id: "7",
    question: "What is the coldest temperature ever recorded in Sweden?",
    options: [
      "-42.6 °C (43.6 °F)",
      "-56.6 °C (-68.8 °F)",
      "-52.6 °C (-61.6 °F)",
      "-46.6 °C (-50.8 °F)",
    ],
    correct: "-52.6 °C (-61.6 °F)",
  },
  {
    id: "8",
    question: "What is the most sacred house rule in Sweden?",
    options: [
      "No alcohol at home",
      "Take your shoes of indoors",
      "No peets allowed indoors",
      "No eating infront of the TV",
    ],
    correct: "Take your shoes off indoors",
  },
  {
    id: "9",
    question: "What is the currentcy of Sweden?",
    options: [
      "Euro",
      "Swedish Crowns (SEK)",
      "Swedish Pesos (SEP)",
      "American Dollar (USD)",
    ],
    correct: "Swedish Crowns (SEK)",
  },
];
//Questions and Options array

function welcomeUser() {
  let hiUser = document.getElementById("hiUser");
  hiUser.innerHTML = "hi, " + user.value;
}
function displayLeaderboard() {
  // Retrieve leaderboard data from storage
  let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardData.sort((a, b) => b.score - a.score);
  const bestRecords = leaderboardData.slice(0, 3);

  // Get the leaderboard table body element
  let leaderboardTableBody = document.getElementById("leaderboard");

  // Clear existing rows in the leaderboard table
  leaderboardTableBody.innerHTML = "";

  let levels = ["🥇", "🥈", "🥉"];

  //   // Loop through the leaderboard data and create table rows
  bestRecords.forEach((entry, index) => {
    let row = `<div class = "scores">
            <div class="icon">${levels[index]}</div>
            <div class="points">${entry.name} - ${entry.score} points</div> 
          </div>`;
    leaderboardTableBody.innerHTML += row;
  });
}

function addScoreToLeaderboard(name, score) {
  // Retrieve leaderboard data from storage (if any)
  let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Add the new score entry to the leaderboard data
  leaderboardData.push({ name, score });

  // Sort the leaderboard data based on scores (descending order)
  leaderboardData.sort((a, b) => b.score - a.score);

  // Store the updated leaderboard data back to storage
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
  displayLeaderboard();
}

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
         <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
      `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let scoreText = document.getElementById("score");
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
    document.getElementById("correct-audio").play();
    scoreText.innerHTML = "Score: " + scoreCount;
  } else {
    document.getElementById("incorrect-audio").play();
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}
//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

function updateHref(e) {
  let err = document.getElementById("usernameErr");
  if (user.value) {
    var startDisplayContainer = document.getElementById(
      "start-display-container"
    );
    // document.location.href = "index.html?user=" + encodeURIComponent(inputValue);
    startDisplayContainer.classList.add("displayNone");
    if (startDisplayContainer.classList.contains("displayNone")) {
      initial();
      welcomeUser();
    }
    err.innerHTML = "";
    err.style.display = "none";
  } else {
    err.innerHTML = "Username field is required.";
    err.style.display = "block";
  }
}
const closeContactModal = () => {
  contactModal.style.display = "none";
};
const closeEmailAlertModal = () => {
  emailAlert.style.display = "none";
};
const openEmailAlertModal = () => {
  emailAlert.style.display = "flex";
};
//Restart Quiz
restart.addEventListener("click", () => {
  window.location.href = "./index.html";
});

//Next Button
nextBtn.addEventListener("click", () => {
  //increment questionCount
  questionCount += 1;
  //if last question
  if (questionCount == quizArray.length) {
    //hide question container and display score

    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    //user score
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
    addScoreToLeaderboard(user.value, scoreCount);
  } else {
    //display questionCount
    countOfQuestion.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " Question";
    //display quiz
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
});

highScore.addEventListener("click", () => {
  highScoreModal.style.display = "block";
});

closeScore.addEventListener("click", () => {
  highScoreModal.style.display = "none";
});

openContact.addEventListener("click", () => {
  contactModal.style.display = "block";
  highScoreModal.style.display = "none";
});

closeContact.addEventListener("click", () => {
  closeContactModal();
});
contactSubmit.addEventListener("click", () => {
  closeContactModal();
  openEmailAlertModal();
});
closeEmailAlert.addEventListener("click", () => {
  closeEmailAlertModal();
});


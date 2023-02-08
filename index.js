class Question {
  constructor(text, choice, answer) {
    this.text = text;
    this.choice = choice;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// --------- Quiz Display -----------

const display = {
  elementShow: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  question: function () {
    this.elementShow("question", quiz.getCurrentQuestion().text);
  },

  choices: function () {
    let choices = quiz.getCurrentQuestion().choice;
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };

    // Affichage des choix +  prise en compte du choix

    for (let i = 0; i < choices.length; i++) {
      this.elementShow("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },

  proress: function () {
    this.elementShow(
      "progress",
      `Question ${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length}`
    );
  },

  endQuizz: function () {
    let endQuizHTML = `
    <h1> Quiz Terminé !</h1>
    <h3> Votre score est : ${quiz.score} / ${quiz.questions.length} </h3>
    `;
    this.elementShow("quiz", endQuizHTML);
  },
};

// ---------- Game Logic ------------

quizApp = () => {
  if (quiz.hasEnded()) {
    // Ecran de fin
    display.endQuizz();
  } else {
    //Afficher question, choix, progression
    display.question();
    display.choices();
    display.proress();
  }
};

// ---------- Creat Quiz ------------

let quiz = new Quiz(questions);
console.log(quiz);
quizApp();

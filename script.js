let cl = console.log;

//---------------------------------------------------------/

game();

function game() {
  let gameBoard = document.getElementById("game-board");
  gameBoard.style.display = "inline-block";

  // Reset the page/game with the reset button:
  let resetBtn = document.getElementById("reset");

  resetBtn.addEventListener("click", function () {
    cl("Reset clicked. A new answer number has been generated.");
    alert("A new answer number will be generated.");
    window.location.reload();
  });

  let hintBtn = document.getElementById("hint");

  let input = document.getElementById("input-submit");
  let submitBtn = document.querySelector("#submit");
  let guess0 = document.getElementById("guess1");
  let guess1 = document.getElementById("guess2");
  let guess2 = document.getElementById("guess3");
  let guess3 = document.getElementById("guess4");
  let guess4 = document.getElementById("guess5");

  let guesses = [];

  let guessContainer = document.getElementById("answer");
  let winText = document.getElementById("hidden-answer-text");
  let submitWrapper = document.getElementById("submit-wrapper");

  // Store title text in variable:

  let titleText = document.getElementById("game-title");

  // Store instruction text in a variable:

  let instructionText = document.getElementById("instructions");

  let answer = Math.floor(Math.random() * 100 + 1);

  cl("randomly generated answer between 1-100: " + answer);

  let val = input.value;

  // PREVENT USER FROM SUBMITTING A NUMBER LONGER THAN 3 INTEGERS:

  /*

      some code should go here :)

*/

  //=================================================================//

  // GAME WIN CONDITION:

  function winCon() {
    submitWrapper.style.display = "none";
    winText.style.display = "contents";
    instructionText.style.display = "none";
    answerText.innerHTML = answer;
    answerText.style.marginBottom = "12px";
    hintBtn.style.display = "none";

    return;
  }

  let answerText = document.getElementById("answer-text");
  let x = document.getElementById("guess-p");

  let guessCount = 0;

  //=================================================================//

  // FUNCTION THAT VALIDATES THE INPUT SUBMISSION:

  function checkSubmission() {
    let guessText = document.getElementById("input-submit").value;
    cl("the submitted number is: " + guessText);

    //--------------------------------------//

    // VALIDITY CHECKS:

    // Check for number above 100 or below 1:
    if (input.value > 100 || (input.value < 1 && input.value != "")) {
      cl("User submitting an invalid number.");
      alert("You guessed an invalid number: " + input.value);
      input.value = "";
      input.focus();
      return;
    }

    // Check for an empty input value or NaN:
    if (input.value === "") {
      cl("User attempting to submit NaN or empty value.");
      alert("You guessed an invalid value.");
      input.value = "";
      input.focus();
      return;
    }

    if (input.value.includes(".")) {
      cl("User attempting to submit a fraction.");
      alert("Your guess must be a whole number.");
      input.value = "";
      input.focus();
      return;
    }

    // Check for input value that matches an already submitted
    // input value:
    if (guesses.includes(guessText)) {
      cl(input.value + " has already been submitted.");
      alert("You already guessed " + input.value);
      input.value = "";
      input.focus();
      return;
    }

    //--------------------------------------//

    // PASSES VALIDITY TESTS:

    guesses.push(guessText);
    updateGuessLi(guessCount);
    guessCount++;

    // Using == because the input.value is a string and the answer
    // is a number:
    if (input.value == answer) {
      cl("user guessed correctly in " + guessCount + " guess(es).");
      winCon();
    } else {
      // Clear the input text:
      input.value = "";
    }

    // ADDING IN THE HINT BUTTON IF THE USER ONLY HAS 2 GUESSES LEFT:
    if (guesses.length >= 3) {
      hintBtn.style.display = "inline-block";
      hintBtn.addEventListener("click", function () {
        instructionText.innerText =
          "The answer is either: " +
          Math.floor(Math.random() * 100 + 1) +
          ", " +
          Math.floor(Math.random() * 100 + 1) +
          ", or " +
          answer;
      });
    }

    // GAME FAIL CONDITION:

    let failLength = guesses.length >= 5;

    if (failLength && guesses[4] != answer) {
      cl("user failed to input the answer number in 5 submissions");
      instructionText.style.display = "none";
      winText.style.display = "contents";
      winText.innerText = "You lose. The correct answer is";
      answerText.innerText = answer;
      answerText.style.marginBottom = "12px";
      submitWrapper.style.display = "none";
      hintBtn.style.display = "none";
      return;
    }
  }

  //=================================================================//

  // EVENT LISTENER FOR CLICKING SUBMIT BUTTON THAT INITIATES OUR CODE:

  submitBtn.addEventListener("click", function () {
    checkSubmission();
  });

  //=================================================================//

  // EVENT LISTENER FOR PRESSING ENTER KEY THAT INITIATES OUR CODE:

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Trigger the button element with a click
      checkSubmission();
    }
  });

  //=================================================================//

  // Store higher and lower guess text in variables to show/hide
  // them based on the input value:

  // CHANGE THE VALUE OF GUESS LIs TO THE SUBMITTED GUESS VALUE
  // AND ALERT USER IF THEIR GUESS IS GREATER THAN OR LESS
  // THAN ANSWER NUMBER:

  function updateGuessLi(idx) {
    let currentGuess = guesses[idx];
    let t = document.getElementById("guess" + idx);
    t.innerHTML = currentGuess;

    // Check to see if guess was lower or higher than the answer:

    let diff = answer - input.value;
    cl(diff);

    if (diff > 0) {
      if (diff > 0 && diff <= 10) {
        cl("guess a slightly larger number");
        instructionText.innerText = "Guess a slightly larger number.";
      } else if (diff > 10 && diff <= 50) {
        cl("guess a larger number");
        instructionText.innerText = "Guess a larger number.";
      } else if (diff >= 51) {
        cl("guess a much larger number");
        instructionText.innerText = "Guess a much larger number.";
      }
    } else if (diff < 0) {
      if (diff < 0 && diff >= -10) {
        cl("guess a slightly smaller number");
        instructionText.innerText = "Guess a slightly smaller number.";
      } else if (diff < -10 && diff >= -50) {
        cl("guess a smaller number");
        instructionText.innerText = "Guess a smaller number.";
      } else if (diff < -50) {
        cl("guess a much smaller number");
        instructionText.innerText = "Guess a much smaller number.";
      }
    }

    input.focus();
  }

  // end game function
}
// -------------------------------------------------------------//

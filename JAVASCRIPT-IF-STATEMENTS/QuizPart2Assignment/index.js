document.getElementById("submitForm").addEventListener("click", onSubmit)

function onSubmit() {
    // Inputs
    const q1 = document.getElementById("question1")
    const q2 = document.getElementById("question2")
    const q3 = document.getElementById("question3")
    const q4 = document.getElementById("question4")
    const q5 = document.getElementById("question5")
  
    // Error Handling Variables
    const q1ErrorHandler = document.getElementById("errorHandlingQ1");
    const q2ErrorHandler = document.getElementById("errorHandlingQ2");
    const q3ErrorHandler = document.getElementById("errorHandlingQ3");
    const q4ErrorHandler = document.getElementById("errorHandlingQ4");
    const q5ErrorHandler = document.getElementById("errorHandlingQ5");
  
    // Counter to know which questions user got correct
    let counter = 0;
  
    // All Answers to inputs
    const answers = {
      q1: "machine code",
      q2: "llp64",
      q3: "ilp32",
      q4: "8", // "eight" is also accepted as an answer
      q5: "lodash",
    };
    
    // Question 1 Error Handler
    if (q1.value.toLowerCase() === answers.q1) {
      counter += 1;
      q1ErrorHandler.innerHTML = "Correct Answer, Good Job!"
      q1ErrorHandler.classList.remove("incorrectAnswer")
      q1ErrorHandler.classList.add("correctAnswer")
    } else {
      q1ErrorHandler.innerHTML = "Incorrect, The Correct Answer was Machine Code";
      q1ErrorHandler.classList.remove("correctAnswer")
      q1ErrorHandler.classList.add("incorrectAnswer")
    }
    
    // Question 2 Error Handler
    if (q2.value.toLowerCase() === answers.q2) {
      counter += 1;
      q2ErrorHandler.innerHTML = "Correct Answer, Good Job!"
      q2ErrorHandler.classList.remove("incorrectAnswer")
      q2ErrorHandler.classList.add("correctAnswer")
    } else {
      q2ErrorHandler.innerHTML = "Incorrect, The Correct Answer was LLP64"
      q2ErrorHandler.classList.remove("correctAnswer")
      q2ErrorHandler.classList.add("incorrectAnswer")
    }
    
    // Question 3 Error Handler
    if (q3.value.toLowerCase() === answers.q3) {
      counter += 1;
      q3ErrorHandler.innerHTML = "Correct Answer, Good Job!"
      q3ErrorHandler.classList.remove("incorrectAnswer")
      q3ErrorHandler.classList.add("correctAnswer")
    } else {
      q3ErrorHandler.innerHTML = "Incorrect, The Correct Answer was ILP32"
      q3ErrorHandler.classList.remove("correctAnswer")
      q3ErrorHandler.classList.add("incorrectAnswer")
    }
    
    // Question 4 Error Handler
    // Question 4 Accepts Answers "8" and "eight"
    if (q4.value.toLowerCase() === answers.q4 || "eight") {
      counter += 1;
      q4ErrorHandler.innerHTML = "Correct Answer, Good Job!"
      q4ErrorHandler.classList.remove("incorrectAnswer")
      q4ErrorHandler.classList.add("correctAnswer")
    } else {
      q4ErrorHandler.innerHTML = "Incorrect, The Correct Answer was 8"
      q4ErrorHandler.classList.remove("correctAnswer")
      q4ErrorHandler.classList.add("incorrectAnswer")
    }
    
    // Question 5 Error Handler
    if (q5.value.toLowerCase() === answers.q5) {
      counter += 1;
      q5ErrorHandler.innerHTML = "Correct Answer, Good Job!"
      q5ErrorHandler.classList.remove("incorrectAnswer")
      q5ErrorHandler.classList.add("correctAnswer")
    } else {
      q5ErrorHandler.innerHTML = "Incorrect, The Correct Answer was Lodash"
      q5ErrorHandler.classList.remove("correctAnswer")
      q5ErrorHandler.classList.add("incorrectAnswer")
    }
    
     // Percentage Calculation and giving a response to user depending on the number of questions the user got correct
    const percent = counter / 5 * 100
    if (counter === 5) {
      mark.innerHTML = `Your Mark is ${counter} / 5 (${percent}%), Incredible!`
      mark.classList.remove("incorrectAnswer")
      mark.classList.add("correctAnswer")
    } else if (counter > 2) {
      mark.innerHTML = `Your Mark is ${counter} / 5 (${percent}%), Wonderful Job!`
      mark.classList.remove("incorrectAnswer")
      mark.classList.add("correctAnswer")
    } else {
      mark.innerHTML = `Your Mark is ${counter} / 5 (${percent}%), Better luck next time.`
      mark.classList.remove("correctAnswer")
      mark.classList.add("incorrectAnswer")
    }
  }
  
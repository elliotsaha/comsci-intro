function onSubmit(e) {
    // Inputs
    const q1 = document.getElementById("question1")
    const q2 = document.getElementById("question2")
    const q3 = document.getElementById("question3")
    const q4 = document.getElementById("question4")
    const q5 = document.getElementById("question5")
  
    // Error Handlers
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
      q4: "8",
      q5: "lodash",
    };
    
    if (q1.value.toLowerCase() === answers.q1) {
      counter += 1;
      q1ErrorHandler.innerHTML = "Correct Answer"
    } else {
      q1ErrorHandler.innerHTML = "Incorrect, The Correct Answer was Machine Code";
    }
  
    if (q2.value.toLowerCase() === answers.q2) {
      counter += 1;
      q2ErrorHandler.innerHTML = "Correct Answer"
    } else {
      q3ErrorHandler.innerHTML = "Incorrect, The Correct Answer was LLP64"
    }
  
    if (q3.value.toLowerCase() === answers.q3) {
      counter += 1;
      q3ErrorHandler.innerHTML = "Correct Answer"
    } else {
      q3ErrorHandler.innerHTML = "Incorrect, The Correct Answer was ILP32"
    }
  
    if (q4.value.toLowerCase() === answers.q4) {
      counter += 1;
      q4ErrorHandler.innerHTML = "Correct Answer"
    } else {
      q4ErrorHandler.innerHTML = "Incorrect, The Correct Answer was 8"
    }
  
    if (q5.value.toLowerCase() === answers.q5) {
      counter += 1;
      q5ErrorHandler.innerHTML = "Correct Answer"
    } else {
      q5ErrorHandler.innerHTML = "Incorrect, The Correct Answer was Lodash"
    }
    
  }
  
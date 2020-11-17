function onSubmit() {
  // Inputs
  const q1 = document.getElementById("question1").value;
  const q2 = document.getElementById("question2").value;
  const q3 = document.getElementById("question3").value;
  const q4 = document.getElementById("question4").value;
  const q5 = document.getElementById("question5").value;
  
  // Error Handlers
  const q1Error = document.getElementById("errorHandlingQ1")
  const q2Error = document.getElementById("errorHandlingQ2")
  const q3Error = document.getElementById("errorHandlingQ3")
  const q4Error = document.getElementById("errorHandlingQ4")
  const q5Error = document.getElementById("errorHandlingQ5")
  
  // Counter to know which questions user got correct
  let counter = 0;
  
  // All Answers to inputs
  const answers = {
      q1: "machine code",
      q2: "llp64",
      q3: "ilp32",
      q4: "8",
      q5: "lodash"
  }

  
  if (q1.toLowerCase() === answers.q1) {
    counter += 1;
    q1Error.innerHTML = ""
  } else {

  }

  if (q2.toLowerCase() === answers.q2) {
    counter += 1;
  } else {

  }

  if (q3.toLowerCase() === answers.q3) {
    counter += 1;
  } else {

  }

  if (q4.toLowerCase() === answers.q4) {
    counter += 1;
  } else {

  }

  if (q5.toLowerCase() === answers.q5) {
    counter += 1;
  } else {

  }

  alert(counter);
}

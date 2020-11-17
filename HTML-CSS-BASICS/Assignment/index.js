function onSubmit() {
  // Inputs
  const q1 = document.getElementById("question1")
  const q2 = document.getElementById("question2")
  const q3 = document.getElementById("question3")
  const q4 = document.getElementById("question4")
  const q5 = document.getElementById("question5")

  // Mark
  const mark = document.getElementById("mark")
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

  // Adding 1 to counter if correct and ignoring case sensitivity
  if (q1.value.toLowerCase() === answers.q1) {
    counter += 1;
  }

  if (q2.value.toLowerCase() === answers.q2) {
    counter += 1;
  } 

  if (q3.value.toLowerCase() === answers.q3) {
    counter += 1;
  }

  if (q4.value.toLowerCase() === answers.q4) {
    counter += 1;
  }

  if (q5.value.toLowerCase() === answers.q5) {
    counter += 1;
  }

  // Percentage Calculation
  const percent = counter / 5 * 100
  mark.innerHTML = `Your Mark Is ${counter} / 5 (${percent}%)`
}
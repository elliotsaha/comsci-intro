// Variables
const input = document.getElementById("takeInput");
const output = document.getElementById("output");

// On Click Listener to 8 Ball Image
document.getElementById("button").addEventListener("click", onSubmit);

// On Submit Functin when Image is Clicked
function onSubmit() {
  // Turning input into lower case (case insensitive) & checking specific values
  if (input.value.toLowerCase() === "does a magic 8 ball actually work?") {
    output.innerHTML = "How dare you doubt me!";
  } else if (input.value.toLowerCase() === "is javascript awesome?") {
    output.innerHTML = "Of Course!";
  } else if (input.value === "") {
    output.innerHTML = "Please ask a question...";
  } else {
    // If Not one of the specific values above, randomize a response
    if (Math.random() >= 0.8) {
      output.innerHTML = "Without a Doubt.";
    } else if (Math.random() >= 0.6 && Math.random() < 0.8) {
      output.innerHTML = "As I see it, yes.";
    } else if (Math.random() >= 0.4 && Math.random() < 0.6) {
      output.innerHTML = "Concentrate and ask again.";
    } else if (Math.random() >= 0.2 && Math.random() < 0.4) {
      output.innerHTML = "Don't count on it";
    } else {
      output.innerHTML = "Outlook not so good.";
    }
  }
}

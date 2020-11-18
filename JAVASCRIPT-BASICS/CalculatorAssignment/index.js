document.getElementById("submit").addEventListener("click", onSubmit)

function onSubmit() {
    const amountPayed = parseInt(document.getElementById("amountPayed").value)

    const tipPercent = parseInt(document.getElementById("inputTipAmount").value) / 100
    
    const tip = tipPercent * amountPayed

    const total = tip + amountPayed
    const totalRounded = parseFloat(total).toFixed(2)
    if (totalRounded === "NaN") {
        document.getElementById("output").innerHTML = "Number Values not put, please check inputs"
    } else {
        document.getElementById("output").innerHTML = `Your Total is $${totalRounded}`
    }
}
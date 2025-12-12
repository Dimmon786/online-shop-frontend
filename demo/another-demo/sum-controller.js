function onJsonFormSubmitted(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".number-field");
    const numbers = [];

    inputs.forEach(input => {
        const value = input.value.trim();
        if (value !== "") {
            numbers.push(Number(value));
        }
    });

    const textarea = document.getElementById("json-input");
    let body;

    try {
        body = JSON.parse(textarea.value);
    } catch (e) {
        alert("Üngültiges JSON. Beispiel: [5, 123, 41]");
        return;
    }

    const request = new XMLHttpRequest();
    request.open("POST", "sum.php");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSumResponseLoaded;
    request.send(JSON.stringify(body));
}

function onSumResponseLoaded(event) {
    const resultLable = document.getElementById("result-lable");

    if (event.currentTarget.status === 200) {
        const response = JSON.parse(event.currentTarget.responseText);
        resultLable.textContent = response.sum;
    } else {
        try {
            const response = JSON.parse(event.currentTarget.responseText);
            resultLable.textContent = "Fehler: " + (response.error || "Unbekannter Fehler");
        } catch {
            resultLable.textContent = "Fehler beim Request.";
        }

    }
}


document
    .getElementById("json-form")
    .addEventListener("submit", onJsonFormSubmitted)

function onFormSubmitted(event) {
    event.preventDefault();

    let fields = document.body.querySelectorAll("input");

    let body = [];

    for (let i = 0; i < fields.length; i++) {
        body.push(fields[i].value);
    }

    let request = new XMLHttpRequest();
    request.open("POST", "api/sum.php");
    request.onload = onRequestLoaded;
    request.send(JSON.stringify(body));
}

function onRequestLoaded(event) {
    if (event.currentTarget.status == 200) {
        document.getElementById("result").innerText = event.currentTarget.responseText;
    }
    else {
        alert("An unknown error occured. Please try again later.");
    }
}

document.getElementById("json-form").addEventListener("submit", onFormSubmitted);
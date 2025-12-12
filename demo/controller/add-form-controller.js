function onFormSubmitted(event) {
    event.preventDefault();

    var fields = document.body.querySelectorAll("input");

    var body = [];

    let params = new URLSearchParams(window.location.search);

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("change", onFormFieldChanged);

        if (params.has("n" + i)) {
            fields[i].value = params.get("n" + 1);
        }
    }

    // for (let i = 0; i < fields.length; i++) {
    //     body.push(fields[i].value);
    // }

    var request = new XMLHttpRequest();
    request.open("POST", "api/add.php");
    request.onload = onRequestLoaded;
    request.send(JSON.stringify(body));
}

function onRequestLoaded(event) {
    if (event.currentTarget.status == 200) {
        document.getElementById("result").innerText = event.currentTarget.responseText;
    }
    else {
        alert("An unknown error occurred. Please try again later.");
    }
}



document.getElementById("add-form").addEventListener("submit", onFormSubmitted);

// console.log(window.location.search.substring(1).split("=")[1]);

console.log(new URLSearchParams);

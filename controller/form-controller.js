function onFormSubmitted(event) {
    event.preventDefault();

    let body = {
        username: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value
    };


    let request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/uek294/api/v1/authenticate");

    request.setRequestHeader("Content-Type", "application/json");

    request.onload = onRequestLoaded;
    request.send(JSON.stringify(body));
}



function onRequestLoaded(event) {
    if (event.currentTarget.status == 204) {
        localStorage.setItem("token", "demo-token");
        window.location.href = "index.php";
    } else {
        let response = JSON.parse(event.currentTarget.responseText);
        alert(response.error_message);
    }

}

document.getElementById("test-form").addEventListener("submit", onFormSubmitted);
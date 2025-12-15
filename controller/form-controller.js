function onFormSubmitted(event) {
    event.preventDefault();

    let body = {
        username: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value
    };


    let request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/uek294/api/v1/authenticate");
    request.withCredentials = true;

    request.onload = onRequestLoaded;
    request.send(JSON.stringify(body));
}



function onRequestLoaded(event) {

    if (event.currentTarget.status == 204) {
        window.location.href = "index.php";
    } else {
        try {

            let response = JSON.parse(event.currentTarget.responseText);
            alert(response.error_message ?? "Login fehlgeschlagen");
        } catch {
            alert("Login fehlgeschlagen");
        }
    }

}

document.getElementById("test-form").addEventListener("submit", onFormSubmitted);
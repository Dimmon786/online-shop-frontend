// Called when login form is submitted
function onFormSubmitted(event) {
    // Prevent deafult form submit (page reload)
    event.preventDefault();

    // Read username and password from input fields
    let body = {
        username: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value
    };

    // Create authentification request
    let request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/uek294/api/v1/authenticate");

    // Send cookies (JWT) wit request
    request.withCredentials = true;

    // Handle response after request is finished
    request.onload = onRequestLoaded;
    // Send login data as JSON
    request.send(JSON.stringify(body));
}


// Called when the authentification request is finshed
function onRequestLoaded(event) {

    // Login succesfull
    if (event.currentTarget.status == 204) {
        // reidrect to dashboard
        window.location.href = "index.php";
    }

    // Login failed, show error message
    try {

        let response = JSON.parse(event.currentTarget.responseText);
        alert(response.error_message ?? "Login fehlgeschlagen");
    } catch {
        alert("Login fehlgeschlagen");
    }

}

// Register submit event on login form
const form = document.getElementById("test-form");
if (form) {
    form.addEventListener("submit", onFormSubmitted);
}
// Register click event on the logout button
const btn = document.getElementById("logout-btn");
if (btn) {
    btn.addEventListener("click", onLogoutClicked);
}

// Called when the logout button is clicked
function onLogoutClicked() {
    // Send request to API to delete the auth cookie (token)
    const request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/uek294/api/v1/unauthenticate");

    // Send cookies with the request
    request.withCredentials = true;

    // Handle response
    request.onload = onLogoutFinished;

    // Optional: handle network error
    request.onerror = () => {
        alert("Logout failed (network error).");
    };

    request.send();
}

// Called when the logout request is finished
function onLogoutFinished(event) {
    // Local token is not used for API auth here, but can be removed anyway
    localStorage.removeItem("token");

    // Redirect to login page
    window.location.href = "form.php";
}

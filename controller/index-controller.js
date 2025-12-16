document.getElementById("logout-btn")?.addEventListener("click", () => {
    const request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/uek294/api/v1/unauthenticate");
    request.withCredentials = true;
    request.onload = () => {

        localStorage.removeItem("token");
        window.location.href = "form.php";
    };
    request.send();
});
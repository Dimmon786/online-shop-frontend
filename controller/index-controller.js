token = localStorage.setItem("token")

if (!token) {
    window.location.href = "form.php"
} else {

}

document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "form.php";
});
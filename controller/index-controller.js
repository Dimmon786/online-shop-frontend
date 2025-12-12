const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "form.php"
}

document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "form.php";
});
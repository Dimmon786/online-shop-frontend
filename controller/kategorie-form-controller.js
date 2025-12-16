window.addEventListener("load", initCategoryForm);

let currentCategoryId = null;

function initCategoryForm() {
    currentCategoryId = getIdFromUrl();

    if (currentCategoryId) {
        loadCategory(currentCategoryId);
    }

    document
        .getElementById("category-form")
        .addEventListener("submit", onCategoryFormSubmitted);
}

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? id : null;
}

function loadCategory(id) {
    const request = new XMLHttpRequest();
    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(id));
    request.withCredentials = true;
    request.onload = onCategoryLoaded;
    request.send();
}

function onCategoryLoaded(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status !== 200) {
        alert("Kategorie konnte nicht geladen werden. Status: " + request.status);
        return;
    }

    let category;
    try {
        category = JSON.parse(request.responseText)
    } catch {
        alert("Kategorie: ungültiges JSON.");
        return;
    }

    fillForm(category);
}

function fillForm(c) {

    document.getElementById("category-id").value = c.category_id ?? "";
    document.getElementById("name-field").value = c.name ?? "";
    document.getElementById("active-select").value = String(c.active ?? "1");
}

function onCategoryFormSubmitted(event) {
    event.preventDefault();

    const category = readForm();

    if (!category.name) {
        alert("Bitte Nmae ausfüllen.");
        return;
    }

    saveCategory(category);
}

function readForm() {
    return {
        category_id: document.getElementById("category-id").value.trim(),
        name: document.getElementById("name-field").value.trim(),
        active: document.getElementById("active-select").value
    };
}

function saveCategory(category) {
    const request = new XMLHttpRequest();

    if (currentCategoryId) {
        // Update
        request.open("PATCH", "https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(currentCategoryId));
    } else {
        // Create
        request.open("POST", "https://campus.csbe.ch/uek294/api/v1/category");
    }

    request.withCredentials = true;
    request.onload = onSaveFinished;
    request.send(JSON.stringify(category));
}

function onSaveFinished(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status === 200 || request.status === 201 || request.status === 204) {
        window.location.href = "kategorie.php";
        return;
    }

    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? response.error ?? "Speichern Fehlgeschlagen.");
    } catch {
        alert("Speichern fehlgeschlagen. Status: " + request.status);
    }
}
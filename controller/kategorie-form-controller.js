window.addEventListener("load", initCategoryForm);

let currentCategoryId = null;

// Runs when the page is loaded
function initCategoryForm() {

    // Read category ID from URL (edit mode)
    currentCategoryId = getIdFromUrl();

    // If ID exists, load category data into the form
    if (currentCategoryId) {
        loadCategory(currentCategoryId);
    }

    // Register submit event on the form
    const form = document.getElementById("category-form");
    if (form) {

        form.addEventListener("submit", onCategoryFormSubmitted);
    }
}

// Reads ID from URL: kategorei-form.php?id=123
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? id : null;
}

// Loads a singel category by ID
function loadCategory(id) {
    const request = new XMLHttpRequest();
    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(id));

    // Send cookies (JWT) with request
    request.withCredentials = true;

    // Handle response
    request.onload = onCategoryLoaded;

    request.send();
}

// Called when category request is finished
function onCategoryLoaded(event) {
    const request = event.currentTarget;

    // No authenticate => redirect to login
    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    // Any error except 200
    if (request.status !== 200) {
        alert("Kategorie konnte nicht geladen werden. Status: " + request.status);
        return;
    }

    // Parse JSON response
    let category;
    try {
        category = JSON.parse(request.responseText)
    } catch {
        alert("Kategorie: ungültiges JSON.");
        return;
    }

    // Fill form fields with category data
    fillForm(category);
}

// Fills the form fields with category values
function fillForm(c) {

    document.getElementById("category-id").value = c.category_id ?? "";
    document.getElementById("name-field").value = c.name ?? "";
    document.getElementById("active-select").value = String(c.active ?? "1");
}

// Called when the form is submitted
function onCategoryFormSubmitted(event) {
    event.preventDefault();

    const category = readForm();

    // Basic validation
    if (!category.name) {
        alert("Bitte Nmae ausfüllen.");
        return;
    }

    saveCategory(category);
}

// Reads values from the form and returns a category object
function readForm() {
    return {
        category_id: document.getElementById("category-id").value.trim(),
        name: document.getElementById("name-field").value.trim(),
        active: document.getElementById("active-select").value
    };
}

// Sends category to the API (create or update)
function saveCategory(category) {
    const request = new XMLHttpRequest();

    // If ID exists => update, otherwise => create
    if (currentCategoryId) {
        // Update
        request.open("PATCH", "https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(currentCategoryId));
    } else {
        // Create
        request.open("POST", "https://campus.csbe.ch/uek294/api/v1/category");
    }

    request.withCredentials = true;
    request.onload = onSaveFinished;
    // Send category as JSON
    request.send(JSON.stringify(category));
}

// Called when the save request is finished
function onSaveFinished(event) {
    const request = event.currentTarget;

    // Not authenticated => redirect to login
    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    // Succes 
    if (request.status === 200 || request.status === 201 || request.status === 204) {
        window.location.href = "kategorie.php";
        return;
    }

    // Shows backend error message
    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? response.error ?? "Speichern Fehlgeschlagen.");
    } catch {
        alert("Speichern fehlgeschlagen. Status: " + request.status);
    }
}
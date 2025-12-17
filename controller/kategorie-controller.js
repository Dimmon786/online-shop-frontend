// Runs when the page is loaded
window.addEventListener("load", () => {
    // Load categories and render the table
    loadCategories();

    // Btn to open the category form (create)
    const btn = document.getElementById("new-category-btn");
    if (btn) {
        btn.addEventListener("click", () => {
            window.location.href = "kategorie-form.php";
        });
    }
});

// Loads the categories list from the API
function loadCategories() {
    const request = new XMLHttpRequest();
    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/categories");

    // Send cookies (JWT) with the request
    request.withCredentials = true;
    // Handle response
    request.onload = onCategoriesLoaded;
    request.send();
}

// Called when teh categories request is finished
function onCategoriesLoaded(event) {
    const request = event.currentTarget;

    // Not authenticated => redirect to login
    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    // Success => parse and render
    if (request.status === 200) {
        try {
            const categories = JSON.parse(request.responseText);
            renderCategories(categories);
        } catch {
            alert("Antwort konnte nicht gelesen werden, ungültiges JSON.");
        }
        return;
    }

    // Other errors
    alert("Fehler beim laden der Kategorien. Status: " + request.status);
}

// Renders the categories into the table body
function renderCategories(categories) {
    const tbody = document.getElementById("categories-body");
    if (!tbody) return;

    // Clear old rows
    tbody.innerHTML = "";

    // Empty state
    if (!Array.isArray(categories) || categories.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Keine Kategorien gefunden.";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    // Create one row per category
    for (const c of categories) {
        const tr = document.createElement("tr");

        // ID
        const tdId = document.createElement("td");
        tdId.textContent = c.category_id ?? "";
        tr.appendChild(tdId);

        // Name
        const tdName = document.createElement("td");
        tdName.textContent = c.name ?? "";
        tr.appendChild(tdName);

        // Active
        const tdActive = document.createElement("td");
        tdActive.textContent = c.active ?? "";
        tr.appendChild(tdActive);

        // Actions (edit/delete)
        const tdActions = document.createElement("td");

        // Edit link
        const editLink = document.createElement("a");
        editLink.href = "kategorie-form.php?id=" + encodeURIComponent(c.category_id);
        editLink.textContent = "Bearbeiten";
        tdActions.appendChild(editLink);

        tdActions.appendChild(document.createTextNode(" | "));

        // Delete btn
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "löschen";
        deleteBtn.addEventListener("click", () => {
            deleteCategory(c.category_id);
        });
        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    }
}

// Sends deltet request for one category
function deleteCategory(categoryId) {
    const confirmed = confirm("Möchten Sie die Kategorie mit der ID \"" + categoryId + "\" wirklich löschen?");
    if (!confirmed) return;

    const request = new XMLHttpRequest();
    request.open("DELETE", "https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(categoryId));
    request.withCredentials = true;
    request.onload = onDeleteCategoryFinished;
    request.send();

}

// Called when the delete request is finished
function onDeleteCategoryFinished(event) {
    const request = event.currentTarget;

    // Not authenticated => redirect to login
    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    // Succes => reload list
    if (request.status === 200 || request.status === 204) {
        loadCategories();
        return;
    }

    // Show backend error message
    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? "Kategorie konnte nicht gelöscht werden.");
    } catch {
        alert("Kategorie konnte nicht gelöscht werden. Status: " + request.status);
    }
}


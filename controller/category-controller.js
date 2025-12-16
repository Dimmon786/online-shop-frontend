window.addEventListener("load", () => {
    loadCategories();

    const btn = document.getElementById("new-category-btn");
    if (btn) {
        btn.addEventListener("click", () => {
            window.location.href = "kategorie-form.php";
        });
    }
});

function loadCategories() {
    const request = new XMLHttpRequest();
    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/categories");
    request.withCredentials = true;
    request.onload = onCategoriesLoaded;
    request.send();
}

function onCategoriesLoaded(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status === 200) {
        try {
            const categories = JSON.parse(request.responseText);
            renderCategories(categories);
        } catch {
            alert("Antwort konnte nicht gelesen werden, ungültiges JSON.");
        }
        return;
    }

    alert("Fehler beim laden der Kategorien. Status: " + request.status);
}

function renderCategories(categories) {
    const tbody = document.getElementById("categories-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!Array.isArray(categories) || categories.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Keine Kategorien gefunden.";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    for (const c of categories) {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = c.category_id ?? "";
        tr.appendChild(tdId);

        const tdName = document.createElement("td");
        tdName.textContent = c.name ?? "";
        tr.appendChild(tdName);

        const tdActive = document.createElement("td");
        tdActive.textContent = c.active ?? "";
        tr.appendChild(tdActive);

        const tdActions = document.createElement("td");

        const editLink = document.createElement("a");
        editLink.href = "kategorie-form.php?id=" + encodeURIComponent(c.category_id);
        editLink.textContent = "Bearbeiten";
        tdActions.appendChild(editLink);

        tdActions.appendChild(document.createTextNode(" | "));

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

function deleteCategory(categoryId) {
    const confirmed = confirm("Möchten Sie die Kategorie mit der ID \"" + categoryId + "\" wirklich löschen?");
    if (!confirmed) return;

    const request = new XMLHttpRequest();
    request.open("DELETE", "https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(categoryId));
    request.withCredentials = true;
    request.onload = onDeleteCategoryFinished;
    request.send();

}

function onDeleteCategoryFinished(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status === 200 || request.status === 204) {
        loadCategories();
        return;
    }

    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? "Kategorie konnte nicht gelöscht werden.");
    } catch {
        alert("Kategorie konnte nicht gelöscht werden. Status: " + request.status);
    }
}


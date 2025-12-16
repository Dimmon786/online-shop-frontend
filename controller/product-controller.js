window.addEventListener("load", loadProducts);

function loadProducts() {

    const request = new XMLHttpRequest();

    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/products");

    request.withCredentials = true;

    request.onload = onProductsLoaded;

    request.send();

}


function onProductsLoaded(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status === 200) {
        try {
            const products = JSON.parse(request.responseText);
            renderProducts(products);
        } catch (e) {
            alert("Antwort konnte nicht gelesen werden (ungültiges JSON).");
        }
        return;
    }

    alert("Fehler beim Laden der Produkte. Status: " + request.status);


}

function renderProducts(products) {
    const tbody = document.getElementById("products-body");

    if (!tbody) {
        console.error("Kein <tbody id='products-body'> gefunden.");
        return;
    }

    tbody.innerHTML = "";

    if (!Array.isArray(products) || products.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 6;
        td.textContent = "Keine Produkte gefunden.";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    for (const p of products) {
        const tr = document.createElement("tr");

        // ID
        const tdId = document.createElement("td");
        tdId.textContent = p.product_id ?? "";
        tr.appendChild(tdId);

        // Name
        const tdName = document.createElement("td");
        tdName.textContent = p.name ?? "";
        tr.appendChild(tdName);

        // SKU
        const tdSku = document.createElement("td");
        tdSku.textContent = p.sku ?? "";
        tr.appendChild(tdSku);

        // Preis
        const tdPrice = document.createElement("td");
        tdPrice.textContent = p.price ?? "";
        tr.appendChild(tdPrice);

        // Stock
        const tdStock = document.createElement("td");
        tdStock.textContent = p.stock ?? "";
        tr.appendChild(tdStock);

        // Aktionen (bearbeite)
        const tdActions = document.createElement("td");
        const editLink = document.createElement("a");
        editLink.href = "produkt-form.php?sku=" + encodeURIComponent(p.sku);
        editLink.textContent = "Bearbeiten";
        tdActions.appendChild(editLink);

        tdActions.appendChild(document.createTextNode(" | "));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Löschen";
        deleteBtn.addEventListener("click", () => {
            deleteProduct(p.sku);
        });

        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }

}

function deleteProduct(sku) {
    const confirmed = confirm("Möchten Sie das PRodukt mit der SKU \"" + sku + "\" wirklich löschen?");

    if (!confirmed) return;

    const request = new XMLHttpRequest();
    request.open("DELETE", "https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku));

    request.withCredentials = true;
    request.onload = onDeleteFinished;
    request.send();
}

function onDeleteFinished(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status === 200 || request.status === 204) {
        loadProducts();
        return;
    }

    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? "Produkt konnte nicht gelöscht werden.");
    } catch {
        alert("Produkt konnte nicht gelöscht werdewn. Status: " + request.status);
    }
}

window.addEventListener("load", () => {
    const btn = document.getElementById("new-product-btn");
    if (btn) {
        btn.addEventListener("click", () => {
            window.location.href = "produkt-form.php";
        });
    }
});


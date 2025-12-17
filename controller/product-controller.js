// Loads all products from API
function loadProducts() {

    const request = new XMLHttpRequest();

    // GET request to load all products
    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/products");

    // Send cookies (JWT) with the request
    request.withCredentials = true;

    // Handle response
    request.onload = onProductsLoaded;

    request.send();

}


// Called when the product request is finished
function onProductsLoaded(event) {
    const request = event.currentTarget;

    // If user is not authenticated, redirect to login
    if (redirectIfUnauthorized(request)) {
        return;
    }

    // Success: parse JSON an render products
    if (request.status === 200) {
        try {
            const products = JSON.parse(request.responseText);
            renderProducts(products);
        } catch (e) {
            alert("Antwort konnte nicht gelesen werden (ungültiges JSON).");
        }
        return;
    }

    // any other error
    alert("Fehler beim Laden der Produkte. Status: " + request.status);


}

// Renderthe products list into the table body
function renderProducts(products) {
    const tbody = document.getElementById("products-body");

    if (!tbody) {
        console.error("Kein <tbody id='products-body'> gefunden.");
        return;
    }

    // Clear table before rendering new data
    tbody.innerHTML = "";

    // If no products exist, show message
    if (!Array.isArray(products) || products.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 6;
        td.textContent = "Keine Produkte gefunden.";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    // Create one table row per product
    for (const p of products) {
        const tr = document.createElement("tr");

        // Product ID
        const tdId = document.createElement("td");
        tdId.textContent = p.product_id ?? "";
        tr.appendChild(tdId);

        // Product Name
        const tdName = document.createElement("td");
        tdName.textContent = p.name ?? "";
        tr.appendChild(tdName);

        // SKU
        const tdSku = document.createElement("td");
        tdSku.textContent = p.sku ?? "";
        tr.appendChild(tdSku);

        // Price
        const tdPrice = document.createElement("td");
        tdPrice.textContent = p.price ?? "";
        tr.appendChild(tdPrice);

        // Stock
        const tdStock = document.createElement("td");
        tdStock.textContent = p.stock ?? "";
        tr.appendChild(tdStock);

        // Action btn (edit/delete)
        const tdActions = document.createElement("td");

        // Edit link
        const editLink = document.createElement("a");
        editLink.href = "produkt-form.php?sku=" + encodeURIComponent(p.sku);
        editLink.textContent = "Bearbeiten";
        tdActions.appendChild(editLink);

        tdActions.appendChild(document.createTextNode(" | "));

        // Delete btn
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Löschen";
        deleteBtn.addEventListener("click", () => {
            deleteProduct(p.sku);
        });

        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }

}

// Delete a product afer user confirms
function deleteProduct(sku) {
    const confirmed = confirm("Möchten Sie das PRodukt mit der SKU \"" + sku + "\" wirklich löschen?");

    if (!confirmed) return;

    const request = new XMLHttpRequest();
    request.open("DELETE", "https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku));

    request.withCredentials = true;
    request.onload = onDeleteFinished;
    request.send();
}

// Called after delete request is finished
function onDeleteFinished(event) {
    const request = event.currentTarget;

    // Not logged in
    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    // Delete succesful => reload product list
    if (request.status === 200 || request.status === 204) {
        loadProducts();
        return;
    }

    // Show backend error if available
    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? "Produkt konnte nicht gelöscht werden.");
    } catch {
        alert("Produkt konnte nicht gelöscht werdewn. Status: " + request.status);
    }
}

// Helper function: redirects to login if status is 401
function redirectIfUnauthorized(request) {
    if (request.status === 401) {
        window.location.href = "form.php";
        return true;
    }
    return false;
}

// Entrypoint: runs when page is loaded
window.addEventListener("load", init);

function init() {
    wireNewProductButton();
    loadProducts();
}

// Connects the new product btn to the product form
function wireNewProductButton() {
    const btn = document.getElementById("new-product-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        window.location.href = "produkt-form.php";
    });
}

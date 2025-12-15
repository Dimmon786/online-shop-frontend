window.addEventListener("load", initForm);

let currentSku = null;

function initForm() {
    currentSku = getSkuFromUrl();

    loadCategories(() => {
        if (currentSku) {
            loadProduct(currentSku);
        }
    });

    document.getElementById("product-form")
        .addEventListener("submit", onProductFormSubmitted);
}

function getSkuFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const sku = params.get("sku");
    return sku ? sku : null;
}

function loadCategories(onDone) {
    const request = new XMLHttpRequest();

    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/categories");

    request.withCredentials = true;
    request.onload = (event) => onCategoriesLoaded(event, onDone);
    request.send();
}

function onCategoriesLoaded(event, onDone) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status !== 200) {
        alert("Kategorie konnte nicht geladen werden. Status: " + request.status);
        return;
    }

    let categories;
    try {
        categories = JSON.parse(request.responseText);
    } catch {
        alert("Kategorien: ungültiges JSON.");
        return;
    }

    renderCategories(categories);

    if (typeof onDone === "function") onDone();
}

function renderCategories(categories) {
    const select = document.getElementById("category-select");
    select.innerHTML = "";

    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Bitte wählen";
    select.appendChild(opt);

    if (!Array.isArray(categories)) return;

    for (const c of categories) {
        const option = document.createElement("option");

        option.value = c.category_id ?? c.id_category ?? c.id ?? "";
        option.textContent = c.name ?? "";

        select.appendChild(option);
    }
}

function loadProduct(sku) {
    const request = new XMLHttpRequest();

    request.open("GET", "https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku));

    request.withCredentials = true;
    request.onload = onProductLoaded;
    request.send();
}


function onProductLoaded(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status !== 200) {
        alert("Produkt konnte nicht geladen werden. Status: " + request.status);
        return;
    }

    let product;
    try {
        product = JSON.parse(request.responseText);
    } catch {
        alert("Produkt: ungültiges JSON.");
        return;
    }

    fillForm(product);
}

function fillForm(p) {
    document.getElementById("product-id").value = p.product_id ?? "";

    document.getElementById("name-field").value = p.name ?? "";
    document.getElementById("sku-field").value = p.sku ?? "";
    document.getElementById("price-field").value = p.price ?? "";
    document.getElementById("stock-field").value = p.stock ?? "";
    document.getElementById("image-field").value = p.image ?? "";
    document.getElementById("description-field").value = p.description ?? "";

    document.getElementById("active-select").value = String(p.active ?? "1");
    document.getElementById(category - select).value = String(p.id - category ?? "");

    document.getElementById("sku-field").readOnly = true;
}

function onProductFormSubmitted(event) {
    event.preventDefault();

    const product = readForm();

    if (!product.sku || !product.name) {
        alert("Bitte SKU und Name ausfüllen.");
        return;
    }
    if (product.id_category === "") {
        alert("Bitte Kategorie wählen.");
        return;
    }

    saveProduct(product);
}

function readForm() {
    return {
        sku: document.getElementById("sku-field").value.trim(),
        name: document.getElementById("name-field").value.trim(),
        price: document.getElementById("price-field").value,
        stock: document.getElementById("stock-field").value,
        id_category: document.getElementById("category-select").value,
        active: document.getElementById("active-select").value,
        image: document.getElementById("image-field").value.trim(),
        description: document.getElementById("description-field").value.trim(),
    };
}

function saveProduct(product) {
    const request = new XMLHttpRequest();

    request.open("PUT", "https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(product.sku));

    request.withCredentials = true;

    request.onload = onSaveFinished;
    request.send(JSON.stringify(product));
}

function onSaveFinished(event) {
    const request = event.currentTarget;

    if (request.status === 401) {
        window.location.href = "form.php";
        return;
    }

    if (request.status === 200 || request.status === 201 || request.status === 204) {
        window.location.href = "produkt.php";
        return;
    }

    try {
        const response = JSON.parse(request.responseText);
        alert(response.error_message ?? response.error ?? "Speichern fehlgeschlagen.");
    } catch {
        alert("Speichern fehlgeschlagen. Stagtus: " + request.status);
    }
}


request.open("DELETE", "https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku));



<?php

$page_name = "produkt-form";

?>
<?php

include "view/header.php";

?>

<h1>Produkt bearbeiten</h1>

<form id="product-form">

    <input type="hidden" id="product-id">

    <label>
        Name:
        <input type="text" id="name-field" required>
    </label>

    <label>
        SKU:
        <input type="text" id="sku-field" required>
    </label>

    <label>
        Preis:
        <input type="number" id="price-field" min="0" step="0.01" required>
    </label>

    <label>
        Stock:
        <input type="number" id="stock-field" min="0" step="1" required>
    </label>

    <label>
        Kategorie:
        <option value="">Bitte wählen</option>
        <select id="category-select" required>
        </select>
    </label>

    <label>
        Aktiv:
        <select id="active-select">
            <option value="1">Aktiv</option>
            <option value="0">Inaktiv</option>
        </select>
    </label>

    <label>
        Bild-Url:
        <input type="text" id="image-field">
    </label>

    <label>
        Beschreibung:
        <textarea id="description-field"></textarea>
    </label>


    <button type="submit">Speichern</button>
    <a href="produkt.php">Abrechen</a>
</form>

<script src="controller/produkt-form-controller.js"></script>


<?php

include "view/footer.php";

?>
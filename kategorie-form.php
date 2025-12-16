<?php

$page_name = "kategorie-form";

?>
<?php

include "view/header.php";

?>

<h1>Kategorie</h1>

<form id="category-form">
    <input type="hidden" id="category-id">

    <label>
        Name:
        <input type="text" id="name-field" required>
    </label>

    <label>
        Aktiv:
        <select id="active-select" required>
            <option value="1">Aktiv</option>
            <option value="0">Inaktiv</option>
        </select>
    </label>

    <button type="submit">Speicher</button>
    <a href="kategorie.php">Abbrechen</a>

</form>

<script src="controller/kategorie-form-controller.js"></script>


<?php

include "view/footer.php";

?>
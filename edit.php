<?php

$page_name = "edit";

?>
<?php

include "view/header.php";

?>

<h1>Produkt bearbeiten</h1>

<form>
    <label>
        Name:
        <input type="text" required>
    </label>

    <label>
        Preis:
        <input type="number" min="0" step="1" required>
    </label>

    <button>Speichern</button>
    <a href="index.php">Abrechen</a>
</form>
<?php

include "view/footer.php";

?>
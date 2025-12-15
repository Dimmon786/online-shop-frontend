<?php

$page_name = "kategorie";

?>
<?php

include "view/header.php";

?>

<h1>Kategorie bearbeiten</h1>

<form>
    <label>
        Kategorie Name:
        <input type="text" required>
    </label>

    <label>
        Kategorie:
        <input type="number" min="0" step="1" required>
    </label>

    <button>Speichern</button>
    <a href="index.php">Abrechen</a>
</form>
<?php

include "view/footer.php";

?>
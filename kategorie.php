<?php

$page_name = "kategorie";

?>
<?php

include "view/header.php";

?>

<h1>Kategorien</h1>

<div class="page-actions">
    <button id="new-category-btn">Neue Kategorie</button>
</div>

<table>
    <th>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Aktiv</th>
            <th>Aktionen</th>
        </tr>
    </th>
    <tbody id="categories-body"></tbody>
</table>

<script src="controller/kategorie-controller.js"></script>

<?php

include "view/footer.php";

?>
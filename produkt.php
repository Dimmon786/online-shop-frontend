<?php

$page_name = "produkt";

?>
<?php

include "view/header.php";

?>

<h1>Produkte</h1>

<button id="new-produkt-btn">Neues Produkt</button>


<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Preis</th>
            <th>Stock</th>
            <th>Aktionen</th>
        </tr>
    </thead>
    <tbody id="products-body"></tbody>
</table>
<script src="controller/product-controller.js"></script>

<?php

include "view/footer.php";

?>
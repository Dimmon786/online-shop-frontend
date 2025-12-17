<?php

$page_name = "index";

?>

<?php

include "view/header.php";

?>
<h1>Dashboard</h1>

div.card <dashboard-card>
    <div>
        <a class="btn" href="produkt.php">Produkte</a>
        <a class="btn" href="kategorie.php">Kategorien</a>
        <button class="btn btn-danger" id="logout-btn" type="button">Logout</button>
    </div>
</dashboard-card>

<script src="controller/index-controller.js"></script>

<?php

include "view/footer.php";

?>
<?php

$page_name = "index";

?>

<?php

include "view/header.php";

?>
<h1>Dashboard</h1>

<div class="card dashboard-card">
    <div class="dashboard-actions">
        <a class="btn" href="produkt.php">Produkte</a>
        <a class="btn" href="kategorie.php">Kategorien</a>
        <button class="btn btn-danger" id="logout-btn" type="button">
            Logout
        </button>
    </div>
</div>

<script src="controller/index-controller.js"></script>

<?php

include "view/footer.php";

?>
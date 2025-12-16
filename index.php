<?php

$page_name = "index";

?>

<?php

include "view/header.php";

?>
<h1>Dashboard</h1>

<ul>
    <li><a href="produkt.php">Produkte</a></li>
    <li><a href="kategorie.php">Kategorie</a></li>
    <li><button id="logout-btn">Logout</button></li>
</ul>

<script src="controller/index-controller.js"></script>

<?php

include "view/footer.php";

?>
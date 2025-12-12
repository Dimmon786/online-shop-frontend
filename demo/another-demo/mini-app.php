<?php

$page_name = "sum";
include "view/header.php";

?>

<h1>Summe berechnen</h1>

<p>Gib ein JSON-Array ein</p>

<form id="json-form">
    <textarea id="json-input" cols="40" rows="4">[5, 123, 41, 9]</textarea>
    <br>
    <button type="submit">Berechnen</button>
</form>

<p>Resultat: <span id="result-label">-</span></p>

<script src="controller/sum-controller.js"></script>

<?php
include "view/footer.php"
    ?>
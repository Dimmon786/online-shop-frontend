<?php

$page_name = "form";

?>
<?php

include "view/header.php";

?>

<!--
Validagte:
- value given or not
- min and max value
- value has no decimals
-->

<h1>Formular</h1>

<form id="test-form">
    <input type="text" id="username-field">
    <input type="password" id="password-field">
    <button>Senden</button>
</form>

<script src="controller/form-controller.js"></script>

<?php

include "view/footer.php";

?>
<?php $page_name = "add-form"; ?>
<?php include "view/header.php"; ?>

<h1>Zahlen addieren</h1>

<form id="add-form">
    <input type="number">
    <input type="number">
    <input type="number">
    <input type="number">
    <button>Addieren</button>
    <p id="result"></p>
</form>

<script src="controller/add-form-controller.js"></script>

<?php include "view/footer.php"; ?>
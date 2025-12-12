<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>

    <link rel="stylesheet" href="view/stylesheets/style.css">
</head>

<body>
    <nav>
        <ul>
            <li>
                <a href="index.php" <?php echo $page_name == "index" ? 'class="selected"' : ""; ?>>
                    <img src="https://www.migration.sid.be.ch/content/dam/global/bilder/logo-be.svg"
                        style="height: 3em;">
                    Home
                </a>
            </li>
            <li>
                <a href="edit.php" <?php echo $page_name == "edit" ? 'class="selected"' : ""; ?>>Edit</a>
            </li>
            <li>
                <a href="form.php" <?php echo $page_name == "form" ? 'class="selected"' : ""; ?>>Form</a>
            </li>
            <li>
                <a href="add-form.php" <?php echo $page_name == "add-form" ? 'class="selected"' : ""; ?>>Add Numbers</a>
            </li>
        </ul>
    </nav>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>
    <link rel="stylesheet" href="view\stylesheets\style.css">
</head>

<body>
    <nav>
        <ul>
            <li>
                <a href="index.php" <?php echo $page_name == "index" ? 'class="selected"' : ""; ?>>
                    <img src="https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg"
                        style="hight: 3em" alt="">
                    Home

                </a>
            </li>
            <li>
                <a href="edit.php" <?php echo $page_name == "edit" ? 'class="selected"' : ""; ?>>Edit</a>
            </li>
            <li>
                <a href="form.php" <?php echo $page_name == "form" ? 'class="selected"' : ""; ?>>Fomular</a>
            </li>
        </ul>
    </nav>
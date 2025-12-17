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
                <a href="index.php" class="nav-home <?php echo $page_name == "index" ? 'selected' : ''; ?>">
                    <img src="https://miro.medium.com/v2/resize:fit:536/format:webp/0*nSfRoF2d8qANpMGX" alt="Home"
                        class="nav-logo">

                    Home

                </a>
            </li>
            <li>
                <a href="produkt.php" <?php echo $page_name == "produkt" ? 'class="selected"' : ""; ?>>Produkt</a>
            </li>
            <li>
                <a href="kategorie.php" <?php echo $page_name == "kategorie" ? 'class="selected"' : ""; ?>>Kategorie</a>
            </li>
        </ul>
    </nav>
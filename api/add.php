<?php
$body = json_decode(file_get_contents("php://input"), true);

if (!is_array($body)) {
    http_response_code(400);
    die();
}

$sum = 0;
foreach ($body as $value) {
    if (!is_numeric(($value))) {
        continue;
    }

    $sum += $value;
}

echo $sum;
?>
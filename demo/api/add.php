<?php
$body = json_decode(file_get_contents("php://input"), true);

if (!is_array($body)) {
    http_response_code(400);
    die();
}

$sum = 0;
foreach ($body as $value) {
    if (filter_var($value, FILTER_VALIDATE_INT)) {
        if ($value < 0) {
            http_response_code(400);
            echo json_encode(["error" => "The number is incorrect"]);
            exit;
        }
    }



    $sum += $value;
}

echo $sum;
?>
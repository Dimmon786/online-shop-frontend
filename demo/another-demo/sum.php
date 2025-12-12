<?php

header("Content-Type: application/json");

//JSON aus dem Request Body lesen
$rawBody = file_get_contents("php://input");
$data = json_decode($rawBody, true);

//Prüffen ob ein Array angekomment ist
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Erwatet ein JSON-Array mit Zahlen."]);
    exit;
}

//Summe berechnen
$sum = 0;
foreach ($data as $value) {
    if (!is_numeric($value)) {
        http_response_code(400);
        echo json_encode(["error" => "Alle Werte müssen Zahlen sein."]);
        exit;
    }
    $sum += $value;
}

//Summe zurückgeben
echo json_encode(["sum" => $sum]);

// $body = json_decode(json: file_get_contents(filename: "php.//input"), associative: true);

// if (!is_array(value: $body)) {
//     http_response_code((400));
//     die();
// }

// $sum = 0;
// foreach ($body as $value) {
//     if (!is_numeric(($value)) {
//         continue;
//     }

//     $sum += $value;
//     )

// echo $sum;
// }
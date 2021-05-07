<?php
function response(array $data) {
    echo json_encode($data);
    exit;
}

function randomString () {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $token = '';
    for ($i = 0; $i < 64; $i++) {
        $token = $characters[rand(0, strlen($characters))];
    }
    return $token;
}
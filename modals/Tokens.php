<?php

require_once(__DIR__ . '/../controllers/DBController.php');

class Tokens {
    private $table="tokens";

    public function insert (int $user_id, string $token) {
        $query="INSERT INTO $this->table VALUES(NULL, '$user_id', '$token', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY) )";
        return DBController::execute($query);
    }

    public function selectbyUserId (int $user_id) {
        $query="SELECT * FROM $this->table WHERE user_id=$user_id";
        return DBController::execute($query);
    }

    public function selectbyToken (string $token) {
        $query="SELECT * FROM $this->table WHERE token='$token'";
        return DBController::execute($query);
    }

    public function deletebyUserId(int $user_id) {
        $query = "DELETE FROM $this->table WHERE user_id=$user_id";
        return DBController::execute($query);
    }
}

// $tokens=new Tokens();
// $response=$tokens->insert(1, 'cad');
// var_dump($response);

// $tokens=new Tokens();
// $response=$tokens->insert(2, 'asdgf');
// var_dump($response);

// $tokens=new Tokens();
// $response=$tokens->selectbyUserId(2);
// var_dump($response);

// $tokens=new Tokens();
// $response=$tokens->deletedbyUserId(2);
// var_dump($response);

// $tokens=new Tokens();
// $response=$tokens->selectbyToken('as');
// var_dump($response);
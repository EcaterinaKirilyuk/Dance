<?php

require(__DIR__ . '/../controllers/DBController.php');

class Registrations {
    private $table="registrations";
    private $id;
    private $training_id;
    private $user_id;

    public function insert(int $training_id, int $user_id) {
        $query="INSERT INTO $this->table VALUES(NULL, '$training_id', '$user_id')";
        return DBController::execute($query);
    }

    public function select (int $id) {
        $query="SELECT * FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }

    public function delete(int $id) {
        $query = "DELETE FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }
}

// $registrations=new Registrations();
// $response=$registrations->insert(1, 2);
// var_dump($response);

// $registrations=new Registrations();
// $response=$registrations->select(1);
// var_dump($response);

$registrations=new Registrations();
$response=$registrations->delete(1);
var_dump($response);


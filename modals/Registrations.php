<?php

require_once(__DIR__ . '/../controllers/DBController.php');

class Registrations {
    private $table="registrations";

    public function insert(int $trainingId, int $userId) {
        $query="INSERT INTO $this->table VALUES(NULL, '$trainingId', '$userId')";
        return DBController::execute($query);
    }

    public function select (int $id) {
        $query="SELECT * FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }

    public function delete(int $trainingId, int $userId) {
        $query = "DELETE FROM $this->table WHERE training_id=$trainingId AND user_id=$userId";
        return DBController::execute($query);
    }
}

// $registrations=new Registrations();
// $response=$registrations->insert(1, 2);
// var_dump($response);

// $registrations=new Registrations();
// $response=$registrations->select(1);
// var_dump($response);

// $registrations=new Registrations();
// $response=$registrations->delete(1);
// var_dump($response);


<?php

require_once(__DIR__ . '/../controllers/DBController.php');

class Users {
    private $table="users";
   
    public function insert (string $fullname, string $email, string $password) {
        $query="INSERT INTO $this->table VALUES(NULL, '$fullname', '$email', '$password', 'CLIENT', NOW())";
        return DBController::execute($query);
    }

    public function select (int $id) {
        $query="SELECT * FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }

    public function selectByEmail ( string $email) {
        $query="SELECT * FROM $this->table WHERE email='$email'";
        return DBController::execute($query);
    }

    public function update(int $id, string $fullname=NULL, string $email=NULL, string $password=NULL) {
        
        $set = '';

        if($fullname != NULL) {
           $set = $set . 'fullname=' . "'" . $fullname . "'" . ', ';
        }

        if($email != NULL) {
            $set = $set . 'email=' . "'" . $email . "'"  . ', ';
        }

        if($password != NULL) {
            $set = $set . 'password=' . "'" . $password . "'" . ', ';
        }
        
        $set = trim($set, " ,");
        
        $query="UPDATE $this->table SET $set WHERE id=$id";
        // var_dump($query);
        // var_dump("UPDATE users SET fullname='Alex', email='ale345x@mail.ru' WHERE id=1");
        return DBController::execute($query);
    }

    public function delete(int $id) {
        $query = "DELETE FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }
}

// $users=new Users();
// $response=$users->insert('Max', 'max@mail.ru', 'adc');
// var_dump($response);

// $users=new Users();
// $response=$users->selectByEmail('alex1@mail.ru');
// var_dump($response);

// $users=new Users();
// $response=$users->update(1, 'Alex', 'ale345x@mail.ru');
// var_dump($response);

// $users=new Users();
// $response=$users->delete();
// var_dump($response);

// $users=new Users();
// $response=$users->select(3);
// var_dump($response);

/*

'Alex'
'alex@alex'
'123123'


UPDATE users SET




WHERE id = 1;

*/
<?php

require_once(__DIR__ . '/../controllers/DBController.php');

class Trainings {
    private $table="trainings";

    public function insert(string $datetime, string $style) {
        $query="INSERT INTO $this->table VALUES(NULL, '$datetime', '$style')";
        return DBController::execute($query);
    }

    public function select(int $id) {
        $query="SELECT * FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }

    public function selectByDatetime(int $month, int $year, int $userId) {
        $query="SELECT $this->table.*, count(registrations.training_id) clients, SUM(IF(registrations.user_id = $userId,1,0)) registered  FROM $this->table 
        LEFT JOIN registrations ON $this->table.id = registrations.training_id
        WHERE MONTH(datetime)=$month AND YEAR(datetime)=$year
        GROUP BY $this->table.id ORDER BY datetime";
        return DBController::execute($query);
    }

    public function update(int $id, string $datetime=NULL, string $style=NULL) {
        $set='';
        if ($datetime != NULL)
        {
            $set= $set . 'datetime= ' . "'" . $datetime . "'" . ', ' ;
        }

        if ($style != NULL) {
            $set= $set . 'style=' . "'" . $style . "'" . ', ';
        }
        
        $set = trim($set, " ,");

        $query="UPDATE $this->table SET $set WHERE id=$id";
        return DBController::execute($query);
    }

    public function delete(int $id) {
        $query="DELETE FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }
}

// $trainings=new Trainings();
// $response=$trainings->insert('2021-05-6 15:00' , 'SALSA');
// $response=$trainings->insert('2021-05-8 16:00' , 'SALSA');
// $response=$trainings->insert('2021-05-8 17:00' , 'BACHATA');
// $response=$trainings->insert('2021-05-9 12:00' , 'KIZOMBA');
// $response=$trainings->insert('2021-05-9 13:00' , 'BACHATA');
// var_dump($response);

// $trainings=new Trainings();
// $response=$trainings->select(7);
// var_dump($response);

// $trainings=new Trainings();
// $response=$trainings->update(3, NULL, 'KIZOMBA');
// var_dump($response);

// $trainings=new Trainings();
// $response=$trainings->delete(7);
// var_dump($response);
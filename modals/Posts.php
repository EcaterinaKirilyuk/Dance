<?php

require_once(__DIR__ . '/../controllers/DBController.php');

class Posts {
    private $table="posts";

    public function insert(string $comment, string $link, string $file_type, string $style) {
        $query="INSERT INTO $this->table VALUES(NULL, '$comment',  NOW(), '$link', '$file_type', '$style')";
        return DBController::execute($query);
    }

    public function select(int $id) {
        $query="SELECT * FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }

    public function selectList( int $rows, int $from, string $style) {
        $query="SELECT * FROM $this->table  WHERE style='$style' ORDER BY id DESC LIMIT $rows OFFSET $from";
        return DBController::execute($query);
    }

    public function update(int $id, string $comment=NULL, string $link=NULL, string $file_type=NULL, 
    string $style=NULL) {
        $set = '';

        if($comment != NULL) {
           $set = $set . 'comment=' . "'" . $comment . "'" . ', ';
        }

        if($link != NULL) {
            $set = $set . 'link=' . "'" . $link . "'"  . ', ';
        }

        if($file_type != NULL) {
            $set = $set . '$file_type=' . "'" . $file_type . "'" . ', ';
        }

        if($style != NULL) {
            $set = $set . '$style=' . "'" . $style . "'" . ', ';
        }
        
        $set = trim($set, " ,");
        
        $query="UPDATE $this->table SET $set WHERE id=$id";
        return DBController::execute($query);
    }

    public function delete(int $id) {
        $query = "DELETE FROM $this->table WHERE id=$id";
        return DBController::execute($query);
    }
}

// $posts=new Posts();
// var_dump($posts->insert('First photo', 'kizomba.com', 'IMG', 'BACHATA'));
// var_dump($posts->insert('Second photo', 'bachata.com', 'IMG', 'KIZOMBA'));
// var_dump($posts->insert('Third photo', 'salsa.com', 'IMG', 'SALSA'));
// var_dump($posts->insert('First video', 'video1.com', 'VIDEO', 'BACHATA'));
// var_dump($posts->insert('Second video', 'video2.com', 'VIDEO', 'KIZOMBA'));
// var_dump($posts->insert('Third video', 'video3.com', 'VIDEO', 'SALSA'));

// $posts=new Posts();
// $response=$posts->select(12);
// var_dump($response);

// $posts=new Posts();
// $response=$posts->update(1, NULL, 'videobachata.com');
// var_dump($response);

// $posts=new Posts();
// $response=$posts->delete(12);
// $response=$posts->delete(11);
// var_dump($response);

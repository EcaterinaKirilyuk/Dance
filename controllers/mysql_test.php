<?php
//Пример синтаксиса для подключения к базе данных (PHP и MySQL).

//Подключение к базе данных

$hostname="127.0.0.1";
$dbname="dance";
$username="root";
$password="";

$mysqlConnection = mysqli_connect($hostname, $username, $password, $dbname);


$usertable="users";
$query = "SELECT * FROM $usertable";

$result = mysqli_query($mysqlConnection, $query);

if($result === true || $result === false) {
    var_dump($result);
} else {
    $users = [];

    while($data = mysqli_fetch_assoc($result)) {
        $users[$data['id']] = $data;
    }
    var_dump($users);
}



// $query = "DELETE FROM $usertable WHERE fullname IN ('Alex','Svetlana')";
$query="INSERT INTO $usertable VALUES(NULL, 'Julia', 'julia1@mail.ru', 'pass', 'CLIENT', NOW()),
(NULL, 'Alex', 'alex1@mail.ru', '4567', 'CLIENT', NOW())";


$result = mysqli_query($mysqlConnection, $query);

if($result === true || $result === false) {
    var_dump($result);
} else {
    $users = [];

    while($data = mysqli_fetch_assoc($result)) {
        $users[$data['id']] = $data;
    }
    var_dump($users);
}

$query="SELECT count(*) FROM $usertable";

$result = mysqli_query($mysqlConnection, $query);

if($result === true || $result === false) {
    var_dump($result);
} else {
    $users = [];

    while($data = mysqli_fetch_assoc($result)) {
        $users[] = $data;
    }
    var_dump($users);
}

$query="UPDATE $usertable SET email='katryn@mail.ru' WHERE id=1";
 
$result = mysqli_query($mysqlConnection, $query);

if($result === true || $result === false) {
    var_dump($result);
} else {
    $users = [];

    while($data = mysqli_fetch_assoc($result)) {
        $users[$data['id']] = $data;
    }
    var_dump($users);
}


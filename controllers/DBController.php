<?php
class DBController {
    private static $hostname="127.0.0.1";
    private static $dbname="dance";
    private static $username="root";
    private static $password="";
    private static $connection;

    private static function connect() {
        self::$connection = mysqli_connect(self::$hostname, self::$username, self::$password, self::$dbname);
    }

    public static function execute ($query) {
        if(self::$connection==NULL) {
            self::connect();     
        }
        $result = mysqli_query(self::$connection, $query);
        if($result === true) {
            return $result;
        } else if($result === false) {
            return mysqli_error(self::$connection);
        } else {
            $data = [];
        
            while($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            return $data;
        }
    }
}


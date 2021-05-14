<?php

require_once(__DIR__ . '/helpers/helpers.php');

function call(string $controller, string $function, array $data) {
    require_once(dirname(__FILE__) . "/controllers/{$controller}.php");
    $instance = new $controller();
    $instance->$function($data);
}

function get(string $path, string $controller, string $function) {
    $data = $_GET;
    if($_SERVER['REQUEST_METHOD'] === 'GET' && $path === $_SERVER['PATH_INFO']) {
        call($controller, $function, $data);
    }
}

function put(string $path, string $controller, string $function) {
    if($_SERVER['REQUEST_METHOD'] === 'PUT' && $path === $_SERVER['PATH_INFO']) {
        parse_str(file_get_contents("php://input"), $data);
        call($controller, $function, $data);
    }
}

function post(string $path, string $controller, string $function) {
    $data=array_merge($_POST, $_FILES);
    if($_SERVER['REQUEST_METHOD'] === 'POST' && $path === $_SERVER['PATH_INFO']) {
        call($controller, $function, $data);
    }
}

function del(string $path, string $controller, string $function) {
    $data=$_GET;
    if($_SERVER['REQUEST_METHOD'] === 'DELETE' && $path === $_SERVER['PATH_INFO']) {
        call($controller, $function, $data);
    }
}


post("/login", "UserController", "login");
post("/register", "UserController", "register");
del("/logout", "UserController", "logout");
get("/calendar", "TestController", "getCalendar");
post("/post", "PostController", "create");
get("/post", "PostController", "index");
del("/post", "PostController", "delete");
post("/calendar/training", "CalendarController", "createTraining");
get("/calendar/training/list", "CalendarController", "listTrainings");
del("/calendar/training", "CalendarController", "deleteTraining");







get("/hello", "TestController", "hello");
get("/fruits", "TestController", "list");
get("/goodbye", "TestController", "goodbye");
get("/goodnight", "TestController", "goodnight");
get("/byebye", "TestController", "byebye");
get("/musia", "TestController", "pusea");
del("/fruits", "TestController", "list");


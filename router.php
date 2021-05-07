<?php

require_once(__DIR__ . '/helpers/helpers.php');

function call(string $controller, string $function, array $data) {
    require_once(dirname(__FILE__) . "/controllers/{$controller}.php");
    $instance = new $controller();
    $instance->$function($data);
}

function get(string $path, string $controller, string $function) {
    $data = $_REQUEST;
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
    $data=array_merge($_REQUEST, $_FILES);
    if($_SERVER['REQUEST_METHOD'] === 'POST'&& $path === $_SERVER['PATH_INFO']) {
        call($controller, $function, $data);
    }
}

function del(string $path, string $controller, string $function) {
    $data=$_REQUEST;
    if($_SERVER['REQUEST_METHOD'] === 'DELETE' && $path === $_SERVER['PATH_INFO']) {
        call($controller, $function, $data);
    }
}


get("/login", "UserController", "login");
post("/register", "UserController", "register");




get("/hello", "TestController", "hello");
get("/fruits", "TestController", "list");
get("/goodbye", "TestController", "goodbye");
get("/goodnight", "TestController", "goodnight");
get("/byebye", "TestController", "byebye");
get("/musia", "TestController", "pusea");
del("/fruits", "TestController", "list");


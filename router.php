<?php

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





get("/login", "UserController", "login");

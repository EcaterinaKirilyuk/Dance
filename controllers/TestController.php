<?php 

require_once(__DIR__ . './UserController.php');

class TestController {

    function hello($data) {

        echo "Hello " . $data['name'];
    }

    function list() {
        var_dump(["Apple", "Banana", "Cherries"]);
    }

    function goodbye() {
        echo "Goodbye Kate";
    }

    function goodnight() {
        echo "goodnight";
    }

    function byebye() {
        echo "byebye";
    }

    function pusea() {
        echo "sweety pusea";
    }

    function getCalendar(array $data) {
        UserController::isLoggedIn($data['token']);
        // logic
        response([
            'message' => 'OK',
            'success' => true
        ]);
    }
}
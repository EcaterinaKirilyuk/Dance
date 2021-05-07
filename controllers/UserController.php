<?php

require(__DIR__ . '/../modals/Users.php');

class UserController {
    
    function login() {
        echo "Hello, Kate!";
        $token = randomString();
    }

    function register($data) {
        if($data['password'] !== $data['confirm-password']) {
            response(['message'=> 'Password isn\'t correct!']);
        }
        
        $password=password_hash ( $data['password'] , PASSWORD_DEFAULT );

        $users=new Users();
        $response=$users->insert($data['fullname'], $data['email'], $password);
        if($response === true) {
            response(['message'=> 'Successful registration!']);
        }
        else{
            response(['message'=> 'Duplicate email entry!']);
        }
        // true
        // 'Duplicate entry 'kate@mail.ru' for key 'email''

    }
}
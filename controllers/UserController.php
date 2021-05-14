<?php

require_once(__DIR__ . '/../modals/Users.php');
require_once(__DIR__ . '/../modals/Tokens.php');

class UserController {
    
    function login(array $data) {
        $users=new Users();
        $response=$users->selectByEmail($data['email']);
        if(empty($response)) {
            response(['message'=> 'This email doesn\'t exist! You need to register']);
        }

        // var_dump($response, array_keys($response), $response[0]);
        // $row=$response[0];
        // var_dump($row['password']);

        // $corobka = [[['user' => ['name' => 'Alex']]]];
        // var_dump($corobka);

        // $ftoraiaKorobka = $corobka[0];
        // var_dump($ftoraiaKorobka);
        // $tretiaiKorobka = $ftoraiaKorobka[0];
        // var_dump($tretiaiKorobka);
        // $cetviortaiaKorobka = $tretiaiKorobka['user'];
        // var_dump($cetviortaiaKorobka);
        // var_dump($cetviortaiaKorobka['name']);
        // $corobka[0][0]['user']['name'];

        // $corobka = [['user' => [[], ['name' => 'Alex']]]];
        // var_dump($corobka);
        // $vtoraiaKorobka=$corobka[0];
        // var_dump($vtoraiaKorobka);
        // $tretiaiKorobka=$vtoraiaKorobka['user'];
        // var_dump($tretiaiKorobka);
        // $cetviortaiaKorobka=$tretiaiKorobka[0];
        // var_dump($cetviortaiaKorobka);
        // $pitaiaKorobka=$tretiaiKorobka[1];
        // var_dump($pitaiaKorobka['name']);

        $password=$response[0]['password'];
        if(password_verify ($data['password'], $password) === false) {
            response(['message'=> 'Password isn\'t correct!']);
        }

        $user_id=$response[0]['id'];
        $token = randomString();
        $tokens=new Tokens();
        $response=$tokens->insert($user_id, $token);
        if($response === true) {
            response(['token'=> $token]);        
        }
    }

    function register(array $data) {
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

    function logout(array $data) {
        $tokens=new Tokens();
        $response=$tokens->deletebyUserId($data['user_id']);
        if($response === true) {
            response(['message'=> 'Succesfull!']); 
        }
    }

    static function isLoggedIn(string $token) {
        $tokens=new Tokens();
        $response=$tokens->selectbyToken($token);
        if(empty($response)) {
            response([
                'message'=> 'Not logged!',
                'success' => false
            ]);
        }

        $expired_datetime=$response[0]['expired_datetime'];
        if($expired_datetime < date("Y-m-d H:i:s")) {
            response([
                'message'=> 'Your session expired!',
                'success' => false
            ]);
        }
        return $response[0]['user_id'];
    }

}


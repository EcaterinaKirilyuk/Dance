<?php

require(__DIR__ . '/../modals/Users.php');

class UserController {
    
    function login($data) {
        $users=new Users();
        $response=$users->selectByEmail($data['email']);
        if(empty($response)) {
            response(['message'=> 'Not have such email! Youn need to registrate']);
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
      









        
        if($data['password'] !== $response[0]){
            response(['message'=> 'Password isn\'t correct!']);
        }
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
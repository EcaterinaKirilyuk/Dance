<?php

require_once(__DIR__ . '/../modals/Trainings.php');
require_once(__DIR__ . '/../modals/Registrations.php');
require_once(__DIR__ . '/../controllers/UserController.php');

class CalendarController {
    //создать урок
    function createTraining($data) {
        $userId=UserController::isLoggedIn($data['token']);
        $users=new Users();
        $response=$users->select($userId);
        if($response[0]['type'] !== 'TRAINER') {
            response([
                'message'=> 'You are not a trainer!',
                'success'=> false
            ]);
        }
        $trainings=new Trainings();
        $response=$trainings->insert($data['datetime'], $data['style']);
        if($response === true) {
            response([
                'message'=> 'Succesefully created',
                'success'=> true
            ]);
        }
    }

    //удалить урок
    function deleteTraining($data) {
        $userId=UserController::isLoggedIn($data['token']);
        $users=new Users();
        $response=$users->select($userId);
        if($response[0]['type'] !== 'TRAINER') {
            response([
                'message'=> 'You are not a trainer!',
                'success'=> false
            ]);
        }
        $trainings=new Trainings();
        $response=$trainings->delete($data['id']);
        if($response === true) {
            response([
                'message'=> 'Succesefully deleted',
                'success'=> true
            ]);
        }
    }

    //зарегистрироваться на урок
    function registerTraining($data) {
        $userId=UserController::isLoggedIn($data['token']);
        $users=new Users();
        $response=$users->select($userId);
        if($response[0]['type'] !== 'CLIENT') {
            response([
                'message'=> 'You are not a client!',
                'success'=> false
            ]);
        }
        $registrations=new Registrations();
        $response=$registrations->insert($data['training_id'], $userId);
        if($response === true) {
            response([
                'message'=> 'Succesefully registration!',
                'success'=> true
            ]);
        }
    }

    //показать список уроков
    function listTrainings($data) {
        $userId=UserController::isLoggedIn($data['token']);
        $users=new Users();
        $response=$users->select($userId);
        $trainings=new Trainings();
        $response=$trainings->selectByDatetime( $data['month'], $data['year']);
        if (is_array ( $response )) {
            response([
                'list' => $response,
                'success' => true
            ]);  
        }
    }
    //удалить регистрацию на урок   
}
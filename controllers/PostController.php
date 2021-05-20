<?php
require_once(__DIR__ . '/../modals/Posts.php');

class PostController 
{
    function create($data)
    {
        $userId=UserController::isLoggedIn($data['token']);
        $users=new Users();
        $response=$users->select($userId);
        if($response[0]['type'] !== 'TRAINER') {
            response([
                'message'=> 'You are not a trainer!',
                'success'=> false
            ]);
        }

        $name_pieces = explode(".", $data['file']['name']);
        $fileTypeArray = explode("/", finfo_file(finfo_open(FILEINFO_MIME_TYPE), $data['file']['tmp_name']));
        
        $uri = '/storage/' 
        . $data['style']
        . "/"
        . $fileTypeArray[0] 
        . "/" 
        . date("YmdHis") 
        . '.' 
        . end($name_pieces);
        
        $local = __DIR__ . '/..' . $uri;
        file_put_contents($local, file_get_contents($data['file']['tmp_name']));
        
        $posts=new Posts();
        $response=$posts->insert($data['comment'], $uri, $fileTypeArray[0], $data['style']);
        if($response === true) {
            response([
                'message'=> 'OK',
                'success'=> true
            ]);
        }

        echo $response;
    }

    function index($data) {
        $posts=new Posts();
        $response=$posts->selectList($data['rows'], $data['from'], $data['style']);
        if (is_array ( $response )) {
            response([
                'list' => $response,
                'success' => true
            ]);  
        }
    }

    // function delete($data) {
    //     $posts=new Posts();
    //     $response=$posts->delete($data['id']);
    //     if ( $response == true ) {
    //         response([
    //             'success' => true
    //         ]);  
    //     }
    // }
}
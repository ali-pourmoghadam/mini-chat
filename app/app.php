<?php

require_once ('./config.php');

require_once ('./request.php');



function ReadAll(){

    $data = file_get_contents(__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."database".DIRECTORY_SEPARATOR."db.json");
    $data = json_decode($data , true);
    return $data;
}



function getTargetUser($target){

    $data = ReadAll();
    $users = $data['users'];

    foreach($users as $user){
        if($user['username'] == $target){
            return $user;
        }
    }

}

function checkUsernameExists($username){
    $users =  ReadAll()['users'];
    foreach($users as $user){
      if($username == $user['username']){
          return true;
      }
    }
    return false;
}



function checkPasswordMatch($password){
    $users =  ReadAll()['users'];
    foreach($users as $user){
      if($password == $user['password']){
          return true;
      }
    }
    return false;
}



function addUser($username , $fullname , $pass){
    $data =  ReadAll();
    $id = rand(0,999999);
    $data['users'][] = [ 'id'=> $id , 'username' => $username , 'fullName' => $fullname , 'password' => $pass , 'avatar' => 'avatar.jpg' , 'online' => true];
    $data['users-chat'][] = [  $id => [] ];
    file_put_contents(__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."database".DIRECTORY_SEPARATOR."db.json" , json_encode($data , JSON_PRETTY_PRINT));
    return true;
}



function msgEncoder($msg){
        $res = json_encode(['data' => $msg]);
        echo $res;
}



function getUserChat(){
    $data =  ReadAll();
    $userChats = $data['users-chat'];
    foreach($userChats as $chat){
        var_dump($chat);
    }
}


function getUserId($target){
    $users =  ReadAll()['users'];
    foreach($users as $user){
      if($target == $user['username']){
          return  $user['id'];
      }
    }
    return false;

}



 

function addMsgToChat($sender , $contactId , $msg){
    $data =  ReadAll();
    
    foreach( $data['users-chat'] as &$id){
        if(key($id) == $sender ){
            $id[key($id)][$contactId ][] = 
                         [ 
                        "txt" => $msg , 
                        "date" => date("Y/M/d H:i:s")
                         ]
                ;
        }
    }

    file_put_contents(__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."database".DIRECTORY_SEPARATOR."db.json" , json_encode($data , JSON_PRETTY_PRINT));
}


function fileUpdateReader(){
    $data =  ReadAll();
    var_dump(json_encode($data));

}


function getUserChatById($chatSide , $reciver){
    $data  = ReadAll();
    $data = $data['users-chat'];
    $resault = [];
    foreach($data as $chatNode){
        if($chatSide == key($chatNode)){
            $resault = $chatNode[key($chatNode)];
        }
    }
    
    foreach($resault as $key=>$chatNodeChildes){
        if($key == $reciver){
         return $chatNodeChildes;
        }
    }

}


function initUserPageContact($userId){

 
    $data = ReadAll();
    $data = $data['users-chat'];
    $res = [];
    foreach($data as $id){
     
        if(key($id) == $userId){
           
            if(!empty($id)){
                
             
                $res =  array_keys($id[$userId]);
              
            }
        }
    }
    $usersContact = [];
    foreach( $res as $contact){
        $usersContact[] =  CastIdToUser($contact);
    }
    return $usersContact;
 

}



function CastIdToUser($id){
    $data = ReadAll();
  
    foreach($data['users'] as $key=>$user){
        if($data['users'][$key]['id'] == $id){
            return $data['users'][$key]['username'];
        }
    }
}
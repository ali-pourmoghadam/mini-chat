<?php
if(isset($_POST['register'])){
    
    $usernameCheck =  checkUsernameExists($_POST['username']);

    if($usernameCheck){

       msgEncoder([ 'status' => 0, 'msg' => 'usernameAlreadyExists']);

    } else{
        
       if(addUser($_POST['username'] , $_POST['fullname'] , $_POST['password'])){

           $_SESSION[md5($_POST['username'])] =  $_POST['username'];
         

              msgEncoder([ 'status' => 1, 'msg' => 'registerSuccessfully' , 'username' => $_POST['username']]);
       }


    }

   
}


if(isset($_POST['Login'])){
   
   $userExists =  checkUsernameExists($_POST['LoginUsername']);

   if($userExists){
    
       $passwordRes = checkPasswordMatch($_POST['LoginPassword']);

       if($passwordRes){
           
           $_SESSION[md5($_POST['LoginUsername'])] =  $_POST['LoginUsername'];

           msgEncoder([ 'status' => 1, 'msg' => 'login successfully' , 'username' => $_POST['LoginUsername']]);

       }else{

           msgEncoder([ 'status' => 0, 'msg' => 'username or passord is wrong !']);

       }
   }else{
    
       msgEncoder([ 'status' => 0, 'msg' => 'username or passord is wrong !']);
   }
}


if(isset($_POST['getUsers'])){

   if(checkUsernameExists($_POST['username'])){
      echo json_encode(['data' => getTargetUser($_POST['username'])]);
   }else{
       echo json_encode(['data' => false]);
   }
}


if(isset($_POST['userStatus'])){

   echo json_encode(['data'=> getTargetUser($_POST['target'])]);
   
}





if(isset($_POST['initialize']))
{

   $id = getUserId($_POST['reciever']);
   echo  json_encode(["data" => initUserPageContact($id)]);

}




if(isset($_POST['msgSend']))
{

   $contactId =  getUserId($_POST['contact']);
   $senderId =   getUserId($_POST['sender']);
   addMsgToChat($senderId , $contactId , $_POST['msg']);   
   echo json_encode(["data" => true]);

}




if(isset($_POST['getRealtimedata']))
{

$chatSide  =  getUserId($_POST['chatSide']);
$reciver = getUserId($_POST['reiciver']);
$chats = getUserChatById($chatSide , $reciver);
 echo json_encode(['data' => end($chats)['txt']]);
}




if(isset($_POST['loadChat']))
{
   $chatSide  =  getUserId($_POST['chatSide']);
   $reciver = getUserId($_POST['reiciver']);
   $chatSideTxt = getUserChatById($chatSide , $reciver);
   $reciverTxt = getUserChatById( $reciver , $chatSide);

   $data = [$_POST['chatSide']=>[] , $_POST['reiciver']=>[]];
   $data[$_POST['chatSide']] = $chatSideTxt;
   $data[$_POST['reiciver']] = $reciverTxt;
   

 echo json_encode(['data' => $data]);
}
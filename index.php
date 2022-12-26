<?php
require_once("./app/config.php");


if(isset($_GET['register'])){
    pageLoader('register');
}
elseif(isset($_GET['chat'])){
    pageLoader('chat');
}
else{
    pageLoader('login');
}


?>
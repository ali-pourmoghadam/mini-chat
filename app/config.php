<?php
session_start();


// CONSTANT

const ADDRESS = "http://localhost/mini-chat/";

const PARENTFOLDER = "mini-chat";


// PUBLIC FUNCTIONS


function pageLoader($page = 'login' , $data=[]){

    require_once ($_SERVER['DOCUMENT_ROOT']."/".PARENTFOLDER."/pages/partials/header.php");
    require_once ($_SERVER['DOCUMENT_ROOT']."/".PARENTFOLDER."/pages/$page.php");
    require_once ($_SERVER['DOCUMENT_ROOT']."/".PARENTFOLDER."/pages/partials/footer.php");
    
}





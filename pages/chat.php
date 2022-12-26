<?php

if(isset($_GET['username'])){

    if(!isset($_SESSION[md5($_GET['username'])])){

        header('Location: http://localhost/maktab-tamrin/w6/index.php');
    }

}else{
    header('Location: http://localhost/maktab-tamrin/w6/index.php');
}

?>

<div class="lock-page pageDeActive">

    <div class="search-contact ">
        <div class="seach-box">
            <input type="text" id="search"  placeholder="search username ...">
        </div>
        <div class="seach-contect" >
            <div id="seachRes" class="contact-body-item pageDeActiveForce">
                <div class="contact-chat-info"> 
                    <h6 id="seachRes-txt" class="search-res">my-contact</h6>
                </div>
                <div>

                    <img id="seachRes-img" src="#" alt="">
                </div>
            </div>
        </div>

        <button class="btn btn-custom mt-2 d-block mx-auto cancel-search">Cancel</button>
    </div>

</div>




<div class="chat-wrapper">

<div class="chat-box">


    <div class="chat-box-header pageDeActiveForce">

    
       <div class="chat-box-header-menue">
            <img src="./public/img/menue.png" alt="">
            <small class="text-gray " id="date">12.march.2022</small>
        </div>



        <div class="chat-box-header-info">
            <div >
                <span class="info-name">my love</span>
                <br>
                <small class="status d-block text-right  text-gray">online</small>
            </div>
            <img src="./public/img/avatar.jpg" alt="">
        </div>


    </div>


    <div class="chat-box-body">
    

    </div>

    <div class="chat-box-footer pageDeActiveForce">

        <div class="chat-box-footer-msg" dir="rtl"  contenteditable="true"></div>
        <div class="chat-box-footer-send">
            <img src="./public/img/send.png" alt="">
        </div>
    </div>

</div>




<div class="contacts">
    
    <div class="contact-header">
      
            <div class="contact-header-item">
                <img src="./public/img/menue.png" alt="">
                    <div>
                    <img src="./public/img/avatar.jpg" alt="">
                    <small class="d-block text-center pt-4" id="username">username</small>
                    </div>
                <img src="./public/img/rightArrow.png" alt="">
            </div>
    </div>



    <div class="contact-body">


        <div class="search-contact-btn">
        &#128269
        </div>

    </div>

</div>

</div>

<script src="./public/js/chat.js"></script>


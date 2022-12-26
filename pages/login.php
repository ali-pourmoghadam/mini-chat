<div class="container py-4">
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto login-container">
            <img class="d-block img-fluid w-25 mx-auto my-4 " src="./public/img/chat.jpg" alt="#">
            <h5 class="text-center">Sign in</h5>
            <p class="text-center" style="height: 20px;">to continue maktab drive</p>
            <form method="POST" action="./app/app.php">
                <div class="form-group mx-auto form-custom">
                    <label class="custom-label" for="exampleInputEmail1">username: </label>
                    <input name="username" id="LoginUsername" type="text" class="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small class="err" id="LoginErr" class="form-text text-muted"></small>
                </div>
                <div class="form-group mx-auto form-custom">
                    <label class="custom-label" for="exampleInputPassword1">Password</label>
                    <input name="LoginPassword" id="LoginPassword" type="password" class="form-control my-2" id="exampleInputPassword1" placeholder="Password">
                    <small id="emailHelp" class="form-text text-muted">if you haven't account click <a href="<?php echo ADDRESS ?>?register=true">here</a></small>
                </div>
           
                <button name="Login" id="LoginBtn"  type="button" class="btn btn-primary btn-custom d-block mx-auto my-3 custom-btn px-4 py-1">Next</button>
            </form>
        </div>
    </div>
</div>

<script src="./public/js/login.js"></script>


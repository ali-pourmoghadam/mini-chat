
<body>
    <div class="container container-register  my-4 ">
        <h3 class="text-center">Regsiter</h3>
        <div class="col-sm-3 mx-auto my-4">
            <form method="POST" action="./app/app.php">
                <div class="mb-3  ">
                    <label for="exampleInputEmail1" class="form-label">Username : </label>
                    <input type="text" id="usernameRegister" name="usernameRegister" class="form-control"  aria-describedby="emailHelp">
                    <div id="emailHelp" class="username-error-div err" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">full name</label>
                    <input type="text"  id="fullNameRegsiter" name="fullNameRegsiter" class="form-control"  aria-describedby="emailHelp">
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password"  id="passwordRegsiter" name="passwordRegsiter" class="form-control" >
                    <div id="emailHelp" class="password-error-div err" class="form-text"></div>
                </div>

                <div class=" py-3 border-0">
                    <div class="text-center"> already have an account? <a href="index.php" class="text-dark">login here</a>
                    </div>
                </div>
            
            <button type="button" id="btnRegsiter" name="register" class="btn d-block mx-auto btn-custom mt-4">Regsiter</button>
                </form>
        </div>


	<script src="<?php echo ADDRESS ?>public/js/validation.js"></script>

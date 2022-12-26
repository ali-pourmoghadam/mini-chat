var btn = document.querySelector("#btnRegsiter")
var usernameRegister = document.querySelector("#usernameRegister")
var fullName = document.querySelector("#fullNameRegsiter")
var password = document.querySelector("#passwordRegsiter")
var usernamErrorDiv = document.querySelector(".username-error-div")
var passwordErrorDiv = document.querySelector(".password-error-div")




btn.onclick = ()=>{
    let usernameErr  = usernameValidation(usernameRegister)
    if( usernameErr != true){
       
        usernamErrorDiv.innerHTML = usernameErr
    }

    let passwordErr = passwordValidation(password)

    if( passwordErr != true){
      
        passwordErrorDiv.innerHTML = passwordErr
    }


    if(usernameErr == true && passwordErr == true){
        let url = "http://localhost/maktab-tamrin/w6/app/app.php"
        let xhttp = new XMLHttpRequest()
        let form = new FormData()
        form.append('register' ,true)
        form.append('username' , usernameRegister.value)
        form.append('password' , password.value)
        form.append('fullname' , fullName.value)
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let resReq = xhttp.responseText
                resReq = JSON.parse(resReq)
                
                if(resReq.data.status == 0){
                     usernamErrorDiv.innerHTML = resReq.data.msg
                }else{
                    usernamErrorDiv.innerHTML = ""
                    window.location ="http://localhost/maktab-tamrin/w6/index.php?chat=true&username="+resReq.data.username
                }
            
            }
        };
        xhttp.open("post", url , true)
        xhttp.send(form)
            }
}


function usernameValidation(usernameRegister){
    if(usernameRegister.value.length >= 3 && usernameRegister.value.length <= 32){
    
        var regex = RegExp('[^A-Za-z0-9].*');
     
        var usernameRegisterValue = usernameRegister.value;  
        var usernameRegisterRegexExec = regex.exec(usernameRegisterValue)
        if( usernameRegisterRegexExec != null){
            return "sybmol cant be use at username"
          }

          return true

    }else{
        return "username shhould be min 3 or max 32 char"
    }
}





function passwordValidation(password){
    if(password.value.length >= 4 && password.value.length <= 32){
        return true
    }else{
        return "password shoud be atlest 4ch and maximum 32ch"
    }
}


// function EmailUniq(email){

//     fetch('./db.json').then(response => response.json())
//     .then((data)=>{
//         users = data.users
//         for(item of users){
//             if(item.email == email){
//                 return false
//             }
//         }
    

//     })
//     .catch(error => console.log(error));
  
// }




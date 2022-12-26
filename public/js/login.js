 let LoginBtn = document.querySelector("#LoginBtn")
 let LoginUsername = document.querySelector("#LoginUsername")
 let LoginPassword = document.querySelector("#LoginPassword")
 let LoginErr = document.querySelector("#LoginErr")


 LoginBtn.onclick = ()=>{

    let url = "http://localhost/maktab-tamrin/w6/app/app.php"
    let xhttp = new XMLHttpRequest()
    let form = new FormData()
    form.append('Login' ,true)
    form.append('LoginUsername' , LoginUsername.value)
    form.append('LoginPassword' , LoginPassword.value)

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let resReq = xhttp.responseText
            resReq = JSON.parse(resReq)
        

            if(resReq.data.status == 0){
                LoginErr.innerHTML = resReq.data.msg
           }else{
                LoginErr.innerHTML = ""
                window.location ="http://localhost/maktab-tamrin/w6/index.php?chat=true&username="+resReq.data.username
           }
            
        
        }
    };
    xhttp.open("post", url , true)
    xhttp.send(form)
        

 }







let searchContactBtn = document.querySelector(".search-contact-btn")
let lockPage = document.querySelector(".lock-page")
let search = document.querySelector("#search")
let cancelSearch = document.querySelector(".cancel-search")
let seachRes = document.querySelector("#seachRes")
let seachResTxt = document.querySelector("#seachRes-txt")
let seachResImg = document.querySelector("#seachRes-img")
let contactBody = document.querySelector(".contact-body")
let contactBodyItems = document.querySelectorAll(".contact-body-item")
let chatBoxHeader = document.querySelector(".chat-box-header")
let chatBoxFooter = document.querySelector(".chat-box-footer")
let infoName = document.querySelector(".info-name")
let status = document.querySelector(".status")
let chatFooterMsg = document.querySelector(".chat-box-footer-msg")
let chatFooterSend = document.querySelector(".chat-box-footer-send")
let chatBoxBody = document.querySelector(".chat-box-body")
let username = document.querySelector("#username")
let date = document.querySelector("#date")
let chatSide = ""
var interval =""
let intervalActive = false


var url = "http://localhost/maktab-tamrin/w6/app/app.php"
var xhttp = new XMLHttpRequest()




window.onload = ()=>{
  

   let res = xhrReqMaker({"initialize" : true , "reciever" : getUsername()})
   username.innerText = getUsername()
   date.innerText = new Date().toLocaleDateString()
   res.then((data)=>{
   data.data.forEach((contactName)=>{

   
    let wrapper = document.createElement('div')
    wrapper.classList.add("contact-body-item")
    wrapper.setAttribute("id", contactName)

    let innerDiv = document.createElement('div')
    let innerh3 = document.createElement('h3')
    let innerimg = document.createElement('img')
    let p = document.createElement('p')
    innerh3.innerText = contactName
    innerimg.setAttribute("src", "./public/img/avatar.jpg")
    p.innerText = "ther is no chat yet!"
    innerDiv.classList.add("contact-chat-info-child")
    p.classList.add("contact-chat-info-child")
    innerh3.classList.add("contact-chat-info-child")

    innerDiv.appendChild(innerh3)
    innerDiv.appendChild(p)
    wrapper.appendChild(innerDiv)
    wrapper.appendChild(innerimg)
    contactBody.appendChild(wrapper)


   })
   })
    
}






searchContactBtn.onclick = ()=>{
    toggle(true , lockPage)
}

cancelSearch.onclick = ()=>{
    toggle(false , lockPage)
}



search.onkeydown = (e)=>{
    
    let alphabet = rangeLettrs()
    let numbers = rangeNums()
    let username = ""

    if(alphabet.includes(e.key) ||  numbers.includes(parseInt(e.key))){
        username = search.value + e.key
    }

  
    if(e.key == "Backspace"){
    
        username = search.value.substring(0 , search.value.length -1)
    }

    console.log(username)
  

    if(username.length > 0){

        let form = new FormData()
        form.append('getUsers' ,true)
        form.append('username' , username )
    
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = xhttp.responseText
                let  resReq = JSON.parse(data)
                if(resReq.data != false){
                    seachResTxt.innerHTML = resReq.data.username
                    seachResImg.src = "http://localhost/maktab-tamrin/w6/public/img/"+resReq.data.avatar
                    seachRes.classList.remove('pageDeActiveForce')
                    seachRes.style.display ="flex !important"
                    seachRes.style.gap ="1em "
                }else{
                    seachRes.classList.add('pageDeActiveForce')
                }
                            
            }
        };
        xhttp.open("post", url , true)
        xhttp.send(form)



    }

}






seachRes.onclick = (e)=>{

    let shouldAppend = true


    let wrapper = document.createElement('div')
    wrapper.classList.add("contact-body-item")
    wrapper.setAttribute("id", seachResTxt.innerHTML)

    let innerDiv = document.createElement('div')
    let innerh3 = document.createElement('h3')
    let innerimg = document.createElement('img')
    let p = document.createElement('p')
    innerh3.innerText = seachResTxt.innerHTML
    innerimg.setAttribute("src", seachResImg.src)
    p.innerText = "ther is no chat yet!"
    innerDiv.classList.add("contact-chat-info-child")
    p.classList.add("contact-chat-info-child")
    innerh3.classList.add("contact-chat-info-child")

    innerDiv.appendChild(innerh3)
    innerDiv.appendChild(p)
    wrapper.appendChild(innerDiv)
    wrapper.appendChild(innerimg)





   
     cildeList = [... contactBody.children]

     let chats = cildeList.filter((element) => [... element.classList].includes('contact-body-item'))
     

    for(let item of chats){
        if(item.id ==seachResTxt.innerHTML ){
            shouldAppend = false
        }
    }

    if(shouldAppend){
     
        contactBody.appendChild(wrapper)
      
    }

}



document.onclick = (e)=>{
    if([... e.target.classList].includes("contact-chat-info-child")){
        chatBoxBody.replaceChildren()

        if(e.target.parentElement.id == ""){
            chatSide = e.target.parentElement.children[0].innerText
        }else{
            chatSide = e.target.parentElement.id
        }

        
        let res =  xhrReqMaker({userStatus : true , target : chatSide} )
     
        res.then((data)=>{
            infoName.innerText = data.data.fullName
            
            status.innerText = data.data.online ?  "online" : "offline"
        })
      
       loadChatFirstTime(chatSide , getUsername())
        
        toggleForce(true , chatBoxHeader)
        chatBoxFooter.classList.remove("pageDeActiveForce")
    }
}



chatFooterSend.onclick = (e)=>{

    let msg = chatFooterMsg.innerText 
    let res = xhrReqMaker({"msgSend" : true , "msg" :  msg, "contact" : chatSide , "sender" :   getUsername()})
    res.then((data)=>{
       
      if(data.data == true){

          let div = document.createElement("div")
          let br = document.createElement("br")
          div.classList.add("user-chat")
          let innerDiv =  document.createElement("div")
          innerDiv.innerText = msg
          div.appendChild(innerDiv)
          chatBoxBody.appendChild(div)
          chatBoxBody.appendChild(br)
      }

    })
}




function toggle(action =true , target){

        if(action == true){
            target.classList.remove('pageDeActive')
            target.classList.add('pageActive')
        }else{
            target.classList.remove('pageActive')
            target.classList.add('pageDeActive')
        }

}
function toggleForce(action =true , target){

        if(action == true){
            target.classList.remove('pageDeActiveForce')
            target.classList.add('pageActiveForce')
        }else{
            target.classList.remove('pageActiveForce')
            target.classList.add('pageDeActiveForce')
        }

}




function rangeLettrs(){
     let res = []
     for(let i=0 ; i < 26 ; i++){
        res.push( String.fromCharCode('A'.charCodeAt(0) + i))
     }
     for(let i=0 ; i < 26 ; i++){
        res.push( String.fromCharCode('a'.charCodeAt(0) + i))
     }
     return res
}



function rangeNums(){
    let res = []
    for(let i=0 ; i < 10 ; i++){
       res.push(i)
    }
    return res
}


function xhrReqMaker(data={}){

    return new Promise(function (resolve, reject) {

        let url = "http://localhost/maktab-tamrin/w6/app/app.php"
        let xhttp = new XMLHttpRequest()
        let form = new FormData()

        for(let i  in data){
            form.append(i , data[i])
        }
    
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                let resReq = xhttp.responseText
             
                resReq = JSON.parse(resReq)
                resolve(resReq)
            
            }else{
                reject({"data" : false})
            }
        };
    
      
        xhttp.open("post", url , true)
        xhttp.send(form)



    })


}


function getUsername(){
    let get =  window.location.href
    let pattern  = /(username=\w*)/
    let res = get.match(pattern)
     res = res[0].split("=")
    return res[1]
}



function GetingDataRealtime(chatSide){

    if(intervalActive){
            clearInterval(interval)
    }

   intervalActive = true
   interval = setInterval(()=>{
  

    let url = "http://localhost/maktab-tamrin/w6/app/app.php"
    let xhttp = new XMLHttpRequest()
    let form = new FormData()
    form.append("getRealtimedata" , chatSide)
    form.append("chatSide" , chatSide)
    form.append("reiciver" ,  getUsername())

    xhttp.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            let resReq = xhttp.responseText
            resReq = JSON.parse(resReq)
            let res = resReq.data.replace(/(\r\n|\n|\r)/gm, "")
            let lastMsg = checkLastMsg()
            if(res != lastMsg){
                chatSideMsgTmp(resReq.data)
            }
           
        
       

        }
    };

  
    xhttp.open("post", url , true)
    xhttp.send(form)


   },1000)
}






function loadChatFirstTime(chatSide , reciver){
   let res =  xhrReqMaker({  "loadChat" : true ,"chatSide" : chatSide , "reiciver" : reciver})
   res.then((data)=>{
    

    let keys = Object.keys(data.data)
    var allTxt = []
 

     for(key of keys){
     
         if( data.data[key] != null){
             data.data[key].forEach(element => {
             element["writer"] = key
             allTxt.push(element)
         
           
            });
        }
        
     }


     allTxt.sort(
        (a , b)=>  Number( new Date(a.date) )- Number( new Date(b.date))
        
    )

    loadChatDom(allTxt)
    GetingDataRealtime(chatSide)  


   
   })
}





function loadChatDom(arr){
  
    arr.forEach((item)=>{

        if(item.writer == getUsername()){
            let userDivWrapper = document.createElement("div")
            let userDivInner = document.createElement("div")
            userDivWrapper.classList.add("user-chat")
            userDivInner.innerText = item.txt
            userDivWrapper.appendChild(userDivInner)
            chatBoxBody.appendChild(userDivWrapper)
     
        }else{
            
            chatSideMsgTmp(item.txt)
    

        }
    })

}


function chatSideMsgTmp (msg , img = "./public/img/avatar.jpg"){
    
    var sideDivWrapper = document.createElement("div")
    var sideDivInner = document.createElement("div")
    let sideImg = document.createElement("img")
    sideDivWrapper.classList.add("contact-chat")
    sideImg.setAttribute("src" , "./public/img/avatar.jpg")
    sideDivInner.innerText = msg

    sideDivWrapper.appendChild(sideDivInner)
    sideDivWrapper.appendChild(sideImg)
    chatBoxBody.appendChild(sideDivWrapper)
}


function checkLastMsg(){

 let contactChat = document.querySelectorAll(".contact-chat") 
 let texts = []
 contactChat.forEach(element => {
    texts.push(element.children[0].textContent)
  });
 return texts[texts.length -1]

}
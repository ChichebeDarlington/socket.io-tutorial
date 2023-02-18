// make connection
const socket = io.connect("http://localhost:5000")

// dom query

const message = document.querySelector(".message")
const btn = document.querySelector(".btn")
const username = document.querySelector(".username")
const output = document.querySelector(".output")
const feedBack = document.querySelector(".feedback")

const capitalize = (capitalize)=>{
 return capitalize.charAt(0).toUpperCase() + capitalize.slice(1)
}



btn.addEventListener("click", ()=>{
    socket.emit("chat",{
        message:capitalize(message.value),
        username:capitalize(username.value)
    })
    
})

message.addEventListener("keypress",()=>{
    socket.emit("typing", username.value)
})

// listen to the sent back data from server
socket.on("chat", (data)=>{
    feedBack.innerHTML = ""
output.innerHTML += `<span><h3>${data.username}</h3></span> <span><p>${data.message}</p></span>`
})


socket.on("typing", (data)=>{
    console.log(data);
    feedBack.innerHTML = `${data} is typing`
})
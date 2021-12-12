const header = document.querySelector("header");
const body = document.querySelector("body");
let button = document.createElement("button");
button.textContent = "☽"
button.addEventListener("click",(e)=>{
    if (body.classList[0]) {
        body.classList.remove("invert")
        button.textContent = "☽"
    }
    else {
        body.classList.add("invert")
        button.textContent = "☀"
    }
})

header.appendChild(button)
const container_btn = document.querySelector(".container");
const boxElement = document.querySelector(".box");
const numberText = document.querySelector(".number");
const nameKey = document.querySelector(".key .item__name");
const locationKey = document.querySelector(".location .item__name");
const whichKey = document.querySelector(".which .item__name");
const codeKey = document.querySelector(".code .item__name");

// 
document.addEventListener("keydown",(e) => {
    console.log(e);
    container_btn.classList.add("hide");
    boxElement.classList.add("show");
    // set data property
    numberText.innerHTML = e.keyCode;
    nameKey.innerHTML = e.key.toUpperCase();
    locationKey.innerHTML = e.location;
    whichKey.innerHTML = e.which;
    codeKey.innerHTML = e.code;
})
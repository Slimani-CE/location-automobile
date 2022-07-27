// Contact functions
function submitContactForm(form){
    let listInputs = form.querySelectorAll(".input");
    let checkHandler = true;
    let correctStyle = "border-left: 4px solid rgb(69, 175, 105)";
    let errorStyle = "border-left: 4px solid rgb(202, 86, 65)";
    console.log(listInputs);
    // Check if all inputs are not empty
    listInputs.forEach(input => {
        if(input.value)
            input.style = correctStyle;
        else{
            input.style = errorStyle;
            checkHandler = false;
        }
    });

    if( checkHandler && form.checkValidity()){
        form.submit();
    }
}
function resetConBtn(form){
    let listInputs = form.querySelectorAll(".input");
    // Reset style
    listInputs.forEach( input => {
        input.style = null;
    });
    // Reset inputs
    form.reset();
}
// services slides
let selectedSect = 1;
let runSlide = function(btn){
    let listBtn = document.querySelectorAll(".service-btn");
    let sectToCheck = document.querySelector("#"+btn.getAttribute("data-slideId"));
    let listSect = document.querySelectorAll(".service-content");
    selectedSect = parseInt(btn.getAttribute("data-slideId").split("slide")[1]);
    // Remove checks from all btns
    listBtn.forEach(lBtn => {
        lBtn.setAttribute("class", "service-btn");
    });
    // Remove Checks from all sects
    listSect.forEach( sect => {
        sect.setAttribute("class", "service-content hidden");
    });
    // check this btn
    btn.setAttribute("class", "service-btn checked");
    // check this sect
    sectToCheck.setAttribute("class", "service-content");
}
setInterval(function(){
    selectedSect++;
    if(selectedSect > 4) 
        selectedSect = 1;
    console.log(document.getElementById(`slideBtn${selectedSect}`));
    runSlide(document.getElementById(`slideBtn${selectedSect}`));
}, 5000);
// launchSection() will change focus between menu items
function launchSection(item){
    let items = document.getElementsByClassName("menu-item");
    for(let i = 0; i < items.length; i++)
        items[i].setAttribute("class","menu-item");
    item.setAttribute("class","menu-item active-section");
}

// detect when element gets visible on scroll
window.addEventListener("scroll", detect_visibility);
// detect when screen opens for first time
detect_visibility();

function detect_visibility() {
    //If header is hidden we will fix it.
    let header = document.getElementsByClassName("header")[0];
    if(window.scrollY >= 100){
        header.setAttribute("class","header fixed-header");
    }
    else{
        header.setAttribute("class","header");
    }

    // The next lines of code will assure for us the change of focus on menu items
    let elements = document.getElementsByClassName("section");
    for(let i = 0; i < elements.length; i++){

        var top_of_element = elements[i].offsetTop;
        var bottom_of_element = elements[i].offsetTop + elements[i].offsetHeight + elements[i].style.marginTop;
        var bottom_of_screen = window.scrollY + window.innerHeight;
        var top_of_screen = window.scrollY;
    
        if ((bottom_of_screen*(8/10) > top_of_element) && (top_of_screen*(12/10) < bottom_of_element)) {
            // Element is visible write your codes here
            // You can add animation or other codes here
            console.log("element Id: "+elements[i].id)
            let btnName = elements[i].id.split("-id")[0]+"-btn";
            console.log("DEBUG: detect_visibility() | btn"+btnName);
            let btn = document.getElementById(btnName);
            launchSection(btn);
        } else {
            // the element is not visible, do something else
            // console.log("element is not visible")
        }    

    }
}
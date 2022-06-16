function openPopUp(sectionClass){
    let section = document.getElementsByClassName(sectionClass)[0];
    section.setAttribute("class",sectionClass);
}
function closePopUp(closeBtn){
    let section = closeBtn.parentNode.parentNode.parentNode;
    section.setAttribute("class",section.getAttribute("class")+" hidden");
}

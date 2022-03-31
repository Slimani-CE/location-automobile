function openLogin(){
    loginSection = document.getElementsByClassName("login-container")[0];
    loginSection.style="display:flex;";   
}
function openSignin(){
    siginSection = document.getElementsByClassName("signin-container")[0];
    siginSection.style="display:flex;";   
}
function closeContainer(closBtn){
    closBtn.parentNode.parentNode.parentNode.style="display:none";
}


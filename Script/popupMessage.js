

function displayMsg(msg,duration){

    let code = `
        <style>

            .popup{
                position: absolute;
                width: 300px;
                height: 150px;
                background-color: #3C3A4F;
                border: 5px solid #FFC171;
                top: -200px;
                right: 20px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .popup span{
                font-size: 50px;
                font-weight: bold;
                color: #FFC171;
            }

            @keyframes action {
                
                10%{
                    top: 20px;
                }
                90%{
                    top: 20px;
                }
                100%{
                    top: -200px;
                }
            }
        </style>

        <div class="popup active">
            <span class="message">Message !!!</span>
        </div>

    `
    let body = document.getElementsByTagName=("body")[0];
    body.innerHTML += code;
    let active = document.getElementsByClassName("active")[0];
    let message = document.getElementsByClassName("message")[0];
    message.innerHTML = msg;
    active.style = `animation: action ${duration}s `;
}



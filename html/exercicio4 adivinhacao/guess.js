let ramdomNum = null;

function adivNum(){
    event.preventDefault()

    let boxResult = document.getElementById("result")
    let userNum = parseInt(document.getElementById("inpNum").value);

    if (ramdomNum === null) {
        ramdomNum = Math.floor(Math.random() * 100);  
        console.log("Número aleatório gerado: " + ramdomNum);  
    }

    if (userNum == ramdomNum){
        boxResult.innerHTML = "Parabéns, conseguiu!"
        boxResult.style.setProperty("background-color", "green");
    } else if (userNum > ramdomNum){
        boxResult.innerHTML = "O número digitado foi muito grande, tente novamente"
        boxResult.style.setProperty("background-color", "red");
    } else if (userNum < ramdomNum){
        boxResult.innerHTML = "O número digitado foi muito pequeno, tente novamente"
        boxResult.style.setProperty("background-color", "red");
    }
};
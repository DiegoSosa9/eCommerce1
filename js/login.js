

function validar(){
    document.getElementById("floatingPassword").classList.remove("borde-red");
    document.getElementById("floatingInput").classList.remove("borde-red");
    let inputPass = document.getElementById("floatingPassword").value;
    let inputEmail = document.getElementById("floatingInput").value;
    if ( inputPass == "" || inputEmail == ""){
        document.getElementById("floatingPassword").classList.add("borde-red");
        document.getElementById("floatingInput").classList.add("borde-red");
        alert("Debe ingresar email y contraseña para ingresar")
    } else if (inputPass.length < 6){
        document.getElementById("floatingPassword").classList.add("borde-red");
        alert("La contraseña debe tener minimo 6 caracteres")
    } else {
        window.location.replace("menu.html")
        
    }
    
}


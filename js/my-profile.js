document.addEventListener('DOMContentLoaded', function(){
    let email = localStorage.getItem('email');
    let input = document.getElementById('inputEmail');
    
    input.value = email;

    let nombre = document.getElementById('inputPriNom');
    let apellido = document.getElementById('inputPriAp');
    let nombre2 = document.getElementById('inputSegNom');
    let apellido2 = document.getElementById('inputSegAp');
    let tel = document.getElementById('inputContacto');

    nombre.value = localStorage.getItem('nombrePerfil');
    apellido.value = localStorage.getItem('apellidoPerfil');

    nombre2.value = localStorage.getItem('nombre2Perfil');
    apellido2.value = localStorage.getItem('apellido2Perfil');
    tel.value = localStorage.getItem('telefonoPerfil');

})

let boton = document.getElementById('btn');
boton.addEventListener('click', function(){
    let email = document.getElementById('inputEmail').value;
    let nombre = document.getElementById('inputPriNom').value;
    let apellido = document.getElementById('inputPriAp').value;
    let nombre2 = document.getElementById('inputSegNom').value;
    let apellido2 = document.getElementById('inputSegAp').value;
    let tel = document.getElementById('inputContacto').value;


    let nomValid = document.getElementById('valid-nombre');
    let nomInvalid = document.getElementById('invalid-nombre');

    let apeValid = document.getElementById('valid-apellido');
    let apeInvalid = document.getElementById('invalid-apellido');

    let emailValid = document.getElementById('valid-email');
    let emailInvalid = document.getElementById('invalid-email');

    if (nombre.length > 0){
        nomValid.style.display = "block";
        nomInvalid.style.display = "none";
    }else{
        nomInvalid.style.display = "block";
        nomValid.style.display = "none";
    }

    if (apellido.length > 0){
        apeValid.style.display = "block";
        apeInvalid.style.display = "none";
    }else{
        apeInvalid.style.display = "block";
        apeValid.style.display = "none";
    }


    if (email.length > 0){
        emailValid.style.display = "block";
        emailInvalid.style.display = "none";
    }else{
        emailInvalid.style.display = "block";
        emailValid.style.display = "none";
    }


    if (nombre.length > 0 && email.length > 0 && apellido.length > 0){
        localStorage.setItem('nombrePerfil', nombre);
        localStorage.setItem('apellidoPerfil', apellido);
        localStorage.setItem('email', email);
        if (nombre2.length > 0){
            localStorage.setItem('nombre2Perfil', nombre2);
        }
        if (apellido2.length > 0){
            localStorage.setItem('apellido2Perfil', apellido2);
        }
        if (tel.length > 0){
            localStorage.setItem('telefonoPerfil', tel);
        }
        
    }


})
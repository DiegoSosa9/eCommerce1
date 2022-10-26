const jsonlink = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

async function getData(url){
    let dato = await fetch(url);
    if (dato.ok){
        let info = await dato.json();
        return info
    }
}

let productos = document.getElementById('productos');

document.addEventListener('DOMContentLoaded', async function(){
    let jsonCarrito = await getData(jsonlink);
    let productosCarrito = jsonCarrito.articles;
    let listaProductos = ``;
    for (let i = 0; i < productosCarrito.length; i++) {
        listaProductos += `
        <div class="d-flex">
            <div class="p0 col-2">
            <img src="${productosCarrito[i].image}" alt="" style="height:50px; width:auto;">
            </div>
            <p class="col-2">${productosCarrito[i].name}</p>
            <p class="col-2">${productosCarrito[i].currency} <span id="costo_id">${productosCarrito[i].unitCost}</span></p>
            <div class="p0 col-2"><input type="number" class="form-control"  style="width: 30%;" value="${productosCarrito[i].count}" id="id_input"></div>
            <p class="col-2"><b>${productosCarrito[i].currency}  <span id="id_subtotal">${productosCarrito[i].unitCost} </span></b></p>
        </div>
        `;
    };
    productos.innerHTML = listaProductos;

    let input = document.getElementById("id_input");
    
    input.addEventListener('change', updateValue);
    let subtotal;
    function updateValue(){
        let costo = document.getElementById("costo_id");
        let subto = document.getElementById("subtotal");
        subtotal = input.value * costo.innerText;
        let subtotal_html = document.getElementById("id_subtotal");
        subtotal_html.innerText= subtotal;
        subto.innerHTML = subtotal;
    }


    let express = document.getElementById('express')
    let premium = document.getElementById('premium')
    let standard = document.getElementById('standard')

    updateValue();

    express.addEventListener ('focus', function(){
        let costoenvio = document.getElementById('costo-envio')
        let costos = (subtotal * 0.07) ;
        costoenvio.innerHTML = `${costos}`;
        let total = document.getElementById('total');
        let tot = (costos + subtotal);
        total.innerHTML = tot;
    })

    premium.addEventListener ('focus', function(){
        let costoenvio = document.getElementById('costo-envio')
        let costos = (subtotal * 0.15) ;
        costoenvio.innerHTML = `${costos}`;
        let total = document.getElementById('total');
        let tot = (costos + subtotal);
        total.innerHTML = tot;
    })
    standard.addEventListener ('focus', function(){
        let costoenvio = document.getElementById('costo-envio')
        let costos = (subtotal * 0.05) ;
        costoenvio.innerHTML = `${costos}`;
        let total = document.getElementById('total');
        let tot = (costos + subtotal);
        total.innerHTML = tot;
    })
});

let fcompra = document.getElementById("finalizar-compra");
fcompra.addEventListener('click', function(){

    let inputCalle = document.getElementById("inputCalle");

    let displayCalle1 = document.getElementById("valid-calle");
    let displayCalle2 = document.getElementById("invalid-calle")
    if (inputCalle.value.length > 0 ){
        displayCalle1.style.display = "block";
        displayCalle2.style.display = "none"
    } else {
        displayCalle1.style.display = "none";
        displayCalle2.style.display = "block"
    }


    let inputNumero = document.getElementById("inputNumero");
    let displayNumero1 = document.getElementById("valid-numero");
    let displayNumero2 = document.getElementById("invalid-numero")
    if (inputNumero.value.length > 0 ){
        displayNumero2.style.display = "none";
        displayNumero1.style.display = "block";
    } else {
        displayNumero1.style.display = "none";
        displayNumero2.style.display = "block"
    }


    let inputEsquina = document.getElementById("inputEsquina");
    let displayEsquina1 = document.getElementById("valid-esquina");
    let displayEsquina2 = document.getElementById("invalid-esquina");
    if (inputEsquina.value.length > 0 ){
        displayEsquina2.style.display = "none";
        displayEsquina1.style.display = "block";
    } else {
        displayEsquina1.style.display = "none";
        displayEsquina2.style.display = "block"
    }


    let costoenvio = document.getElementById("costo-envio");
    let envio1 = document.getElementById("valid-envio");
    let envio2 = document.getElementById("invalid-envio");
    if (costoenvio.innerText == null || costoenvio.innerText =='' || costoenvio.innerText == undefined){
        envio2.style.display = "block";
        envio1.style.display = "none";
    }else{
        envio1.style.display = "block";
        envio2.style.display = "none";
    }



    let pago1 = document.getElementById("valid-pago");
    let pago2 = document.getElementById("invalid-pago");

    let numcuenta1 = document.getElementById("valid-numcuenta");
    let numcuenta2 = document.getElementById("invalid-numcuenta");

    let tcredito1 = document.getElementById("valid-tcredito");
    let tcredito2 = document.getElementById("invalid-tcredito");


    if (!tarjetadecredito.checked){
        if(!transferenciabancaria.checked){
            pago2.style.display = "block";
            pago1.style.display = "none";
        }else{
            if(numdecuenta.value.length > 0){
                numcuenta1.style.display = "block";
                numcuenta2.style.display = "none";

                pago1.style.display = "block";
                pago2.style.display = "none";
            }else{
                numcuenta2.style.display = "block";
                numcuenta1.style.display = "none";
            }
        }
        
    }else{
        if(numdetarjeta.value.length > 0 && codigodeseg.value.length > 0 && vencimiento.value.length > 0){
            tcredito1.style.display = "block";
            tcredito2.style.display = "none";

            pago1.style.display = "block";
            pago2.style.display = "none";
        }else{
            tcredito2.style.display = "block";
            tcredito1.style.display = "none";
        }
        
    }




})


    let tarjetadecredito = document.getElementById("tarjeta-de-credito");
    let transferenciabancaria = document.getElementById("transferencia-bancaria");
    let numdecuenta = document.getElementById("numero-de-cuenta");
    let numdetarjeta = document.getElementById("numero-de-tarjeta");
    let codigodeseg = document.getElementById("codigo-de-seg");
    let vencimiento = document.getElementById("vencimiento");


    tarjetadecredito.addEventListener('focus', function (){
        numdecuenta.disabled = true;
        numdetarjeta.disabled = false;
        codigodeseg.disabled = false;
        vencimiento.disabled = false;
    })

    transferenciabancaria.addEventListener('focus', function(){
        numdetarjeta.disabled = true;
        codigodeseg.disabled = true;
        vencimiento.disabled = true;
        numdecuenta.disabled = false;
    })



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
    
    function updateValue(){
        let costo = document.getElementById("costo_id");
        let subtotal;
        subtotal = input.value * costo.innerText;
        let subtotal_html = document.getElementById("id_subtotal");
        subtotal_html.innerText= subtotal;
    }
});




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
            <p class="col-2">${productosCarrito[i].currency} ${productosCarrito[i].unitCost}</p>
            <div class="p0 col-2"><input type="text" class="form-control"  style="width: 30%;" value="${productosCarrito[i].count}"></div>
            <p class="col-2"><b>${productosCarrito[i].currency} ${productosCarrito[i].unitCost}</b></p>
        </div>
        `;
    };
    productos.innerHTML = listaProductos;
});


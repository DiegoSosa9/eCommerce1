const idProduct = localStorage.getItem("productId");
const URL = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
const URLCOMMENT = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;;

async function getProduct(link){
    try {
        let response = await fetch(link);
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

function showProduct(producto, imagenes, comentarios){
    let img = '';
    for (let i = 0; i < imagenes.length; i++) {
        img += `
        <img src="${imagenes[i]}" alt="" class="col-3">
        `  
    }

    


    let comment = '';
    for (let i = 0; i < comentarios.length; i++) {

        let star = '';
        for (let e = 0; e < comentarios[i].score; e++) {
                star += `
                    <span class="fa fa-star checked"></span>
                    `;
        
    }
    let estrellasSinPintar = 5 - comentarios[i].score ;
    console.log(estrellasSinPintar)
        for (let i = 0; i < estrellasSinPintar; i++) {
            star += `
                    <span class="fa fa-star"></span>
                    `;
        }

        comment += `
        
        <div class="row border">
            <div class="row">
            <div class="d-flex align-items-center">
                <p class="m-0"><strong>${comentarios[i].user}</strong></p>
                <p class="m-0">- ${comentarios[i].dateTime} -</p>
                ${star}
            </div>
            </div>
            <div class="row mt-2">
            <p>${comentarios[i].description}</p>
            </div>
        </div>
        `
    }

    let show = '';
    show += `
        <div class="row">
            <h2 class="mt-5">${producto.name}</h2>
        </div>
        <hr/>
        <div class="row">
            <div class="description">
            <p class="m-0"><strong>Precio</strong></p>
            <p>${producto.cost}</p>
            </div>
            <div class="description">
            <p class="m-0"><strong>Descripción</strong></p>
            <p>${producto.description}</p>
            </div>
            <div class="description">
            <p class="m-0"><strong>Categoría</strong></p>
            <p>${producto.category}</p>
            </div>
            <div class="description">
            <p class="m-0"><strong>Cantidades de vendidos</strong></p>
            <p>${producto.soldCount}</p>
            </div>
        </div>
        <div class="row">
            <p><strong>Imagenes ilustrativas</strong></p>
            <div class="row">
            ${img}
            </div>
            
        </div>

        <div class="mt-5">
        <div class="row">
            <h2 class="mb-3">Comentarios</h2>
        </div>
            ${comment}
        </div>

        
    `
    let contenedor = document.getElementById('producto');
    contenedor.innerHTML = show;
}

document.addEventListener('DOMContentLoaded', async function(){
    let producto = await getProduct(URL);
    let imagenesProducto = producto.images;
    let commentProducto = await getProduct(URLCOMMENT);

    showProduct(producto, imagenesProducto, commentProducto);
})
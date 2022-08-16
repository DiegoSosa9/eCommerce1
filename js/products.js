async function getData(){
    
    try {
        const respuesta = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json");
        let info = await respuesta.json();
        return info.products;
    } catch (error) {
        console.log(error);
    }
    
}

async function showProductsList(){
    let listado = "";
    const arrayProducts = await getData();
    for (let i=0; i<arrayProducts.length ; i++){
        listado += `
            <div onclick="setCatID(${arrayProducts[i].id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${arrayProducts[i].image}" alt="${arrayProducts[i].image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${arrayProducts[i].name} - ${arrayProducts[i].currency} ${arrayProducts[i].cost}</h4>
                            <small class="text-muted">${arrayProducts[i].soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${arrayProducts[i].description}</p>
                    </div>
                </div>
            </div>
            `;
            
    }
    
    const productos = document.getElementById("prod-list-container");
    productos.innerHTML = listado;
    
}

showProductsList();
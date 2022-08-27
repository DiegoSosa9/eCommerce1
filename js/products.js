const getCat = localStorage.getItem("catID");
const jsonProduct = `https://japceibal.github.io/emercado-api/cats_products/${getCat}.json`
let minPrice = undefined;
let maxPrice = undefined;


async function getData(){
    try {
        const respuesta = await fetch(jsonProduct);
        let info = await respuesta.json();
        return info.products;
    } catch (error) {
        console.log(error);
    }
    
}


async function showProductsList(array){
    let listado = "";
    const arrayProducts = array;
    for (let i=0; i<arrayProducts.length ; i++){
        let price = arrayProducts[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(price.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(price.cost) <= maxPrice))){

        listado += `
            <div class="list-group-item list-group-item-action cursor-active">
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
    }
    
    const productos = document.getElementById("prod-list-container");
    productos.innerHTML = listado;
    
}

// showProductsList();

//ordenar por precio
function sortProducts(array, orden){
    let resultado = [];
    const arrayProducts = array;

    if (orden == 1 ){
        resultado = arrayProducts.sort(function(a, b) {
         
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
              
            })
            return resultado;
    }
    if (orden == 0 ){
        resultado = arrayProducts.sort(function(a, b) {
        
            if ( a.cost > b.cost ){ return 1; }
            if ( a.cost < b.cost ){ return -1; }
            return 0;
              
            })
            return resultado;
    }
    if (orden == 2 ){
        resultado = arrayProducts.sort(function(a, b) {
        
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
              
            })
            return resultado;
    }
    
}

document.addEventListener('DOMContentLoaded', async function(){
    const arrayOriginal = await getData();
    showProductsList(arrayOriginal);

    document.getElementById("sortAsc").addEventListener("click", function(){
        const arregloOrdenado = sortProducts(arrayOriginal, '0');
        showProductsList(arregloOrdenado);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        const arregloOrdenado = sortProducts(arrayOriginal, '1');
        showProductsList(arregloOrdenado);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        const arregloOrdenado = sortProducts(arrayOriginal, '2');
        showProductsList(arregloOrdenado);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList(arrayOriginal);
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }
        showProductsList(arrayOriginal);
    });


})
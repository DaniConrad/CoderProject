$(()=>{
    renderCarrito(obtenerStorage('carrito'))
    carrito.push(...obtenerStorage('carrito'))
    console.log(carrito);
});



// -------Storage--------
function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerStorage(clave){
    const valor =  JSON.parse(localStorage.getItem(clave));
    return valor;
 }

// -------Fin de Storage--------

// -------Cards--------

const cards=document.getElementById("cardsContainer");

const renderCards = (array) => {
    cards.innerHTML = ""

    array.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('prod')
        div.innerHTML += `
                        <div class="card m-2" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top card-img-standard" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text">${producto.desc}</p>
                                <p class="precio">$${producto.precio}</p>
                                <button onclick="agregarCarrito(${producto.id})" class="btn btn-primary btnCard">Agregar al Carrito</button>
                            </div>
                        </div>
        `
        cards.appendChild(div)
    });
}
renderCards(stockProductos)

// -------Fin de las Cards--------



// -------Carrito--------
let carrito = []

// // -------Agregar al carrito--------


const agregarCarrito = (prodId) => {
    // console.log(prodId);
    let item = stockProductos.find( (prod) => prod.id === parseInt(prodId))
    if (carrito.find( (prod) => prod.id === parseInt(prodId))) {
        item.cantidad++;
        console.log(item.cantidad);
        console.log(carrito);
        
    }
    else{
      carrito.push(item)  
      console.log("push");
    }
    if (item.cantidad===0) {
        item.cantidad++;
        console.log(3);
    }
    guardarStorage('carrito', carrito);
    renderCarrito(carrito);
}

// ------- Fin de agregar al carrito--------




// --Sacar unidad--
const eliminarCarrito = (prodId) => {
    let item = carrito.find( (prod) => prod.id === prodId )
    if (carrito.find( (prod) => prod.id === parseInt(prodId))) {
        item.cantidad--;
        if (item.cantidad === 0) {
          const indice = carrito.indexOf(item)
          carrito.splice(indice, 1)  
        }
    }
    guardarStorage('carrito', carrito);
    renderCarrito(carrito)
    
}
// --Fin de sacar unidad--

const vaciarCarrito = document.getElementById('vaciarCarrito')

vaciarCarrito.onclick = function() { 
    carrito = [];
    guardarStorage('carrito', carrito);
    renderCarrito(carrito);
 }


// -------Fin de Carrito--------


// -------Muestra de Carrito--------

const obtenerCarrito = document.getElementById('carrito')
const totalizador = document.getElementById('totalizador')

const renderCarrito = (carrito) => {
    obtenerCarrito.innerHTML = ""
    

    carrito.forEach( (prod) => {
        const div = document.createElement('div')
        div.className = "productoEnCarrito d-flex"
        div.innerHTML = `
                        <p class="card-text">${prod.name} Precio: $${prod.precio} x ${prod.cantidad}</p>
                        <button onclick="eliminarCarrito(${prod.id})" class="btn-quitar"><i class="bi bi-x-octagon btn-color-standard"></i></button>
                        `
        
        obtenerCarrito.appendChild(div)
    })
    totalizador.innerText = carrito.reduce((acu, prod) => acu + prod.precio*prod.cantidad, 0)
    
}


// // -------Fin de muestra de Carrito--------

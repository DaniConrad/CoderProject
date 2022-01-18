const stockProductos =[
    {id:1, name:"Cámara exterior", desc:"Bastará con alimentarla con 12Vcc y proveerle de Wifi, podrás marcar zonas para recibir notificaciones.", precio: 6000, cantidad: 1,img:"../img/prod-security/ext-wifi-cam.webp"},
    {id:2, name:"Cámara domo", desc:"Deberás alimentarla con 12vcc y asignarle una red de Wifi estable, esta ofrecerá una visión 360.", precio: 8100, cantidad: 1,img:"../img/prod-security/gadnic-cam.webp"},
    {id:3, name:"Cámara robótica exterior", desc:"Alimentación de 12Vcc, wifi, con movimiento, elimina puntos ciegos sin necesidad de modificar su anclaje.", precio: 5500, cantidad: 1,img:"../img/prod-security/motor-ext-cam.webp"},
    {id:4, name:"Cámara robótica interior", desc:"Alimentación de 12Vcc, wifi, con movimiento, podrás revisar consultorios, oficinas o cualquier interior.", precio: 6100, cantidad: 1, img:"../img/prod-security/robot-cam.webp"},
    
];

// -------Storage--------
function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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
                                <p class="precio ">$${producto.precio}</p>
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

const agregarCarrito = (prodId) => {
    let item = stockProductos.find( (prod) => prod.id === parseInt(prodId))
    if (carrito.find( (prod) => prod.id === parseInt(prodId))) {
        item.cantidad++;
        
    }else{
      carrito.push(item)  
    }
    
    renderCarrito();
}
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
    renderCarrito()
}
// --Fin de sacar unidad--

const vaciarCarrito = document.getElementById('vaciarCarrito')

vaciarCarrito.onclick = function() { 
    carrito = [];
    renderCarrito();
 }


// -------Fin de Carrito--------


// -------Muestra de Carrito--------

const obtenerCarrito = document.getElementById('carrito')
const totalizador = document.getElementById('totalizador')

const renderCarrito = () => {
    obtenerCarrito.innerHTML = ""

    carrito.forEach( (prod) => {
        const div = document.createElement('div')
        div.className = "productoEnCarrito d-flex"
        div.innerHTML = `
                        <p class="card-text">${prod.name} Precio: ${prod.precio} cantidad: ${prod.cantidad}</p>
                        <button onclick="eliminarCarrito(${prod.id})" class="btn-quitar"><i class="bi bi-x-octagon btn-color-standard"></i></button>
                        `
        
        obtenerCarrito.appendChild(div)
    })
    totalizador.innerText = carrito.reduce((acu, prod) => acu + prod.precio*prod.cantidad, 0)
    guardarStorage();
}


// // -------Fin de muestra de Carrito--------

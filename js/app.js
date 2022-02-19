fetch('../../js/stock.json')
    .then(response => response.json())
    .then(data => {
        const stockProductos = data
// ---- Cards ----
        const cards = document.getElementById("cardsContainer");

        const renderCards = (array) => {
            cards.innerHTML = ""

            array.forEach((producto) => {
                const div = document.createElement('div')
                div.classList.add('prod')
                div.innerHTML += `
                        <div class="card m-2" id="${producto.idAnim}" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top card-img-standard" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text">${producto.desc}</p>
                                <p class="precio">$${producto.precio}</p>
                                <button id="${producto.id}" class="btn btn-primary btnCard">Agregar al Carrito</button>
                            </div>
                        </div>
        `
                cards.appendChild(div)



            });
        }
        renderCards(stockProductos)


        // -------------Getting button add to cart-----------
        const BtnGetId = (array) => {
            array.forEach((producto) => {

                const button = document.getElementById(`${producto.id}`)
                button.addEventListener('click', () => {
                    agregarCarrito(producto.id)
                })

            });
        }
        BtnGetId(stockProductos)

        // -------------End of getting button add to cart-----------
        
        const agregarCarrito = (prodId) => {
            let item = stockProductos.find((prod) => prod.id === parseInt(prodId))
            if (carrito.find((prod) => prod.id === parseInt(prodId))) {
                carrito.find((prod) => prod.id === parseInt(prodId)).cantidad++
            } else {
                carrito.push(item)
            }
            if (item.cantidad === 0) {
                item.cantidad++;
            }
            guardarStorage('carrito', carrito);
            renderCarrito();
        }


        // ------- Filter --------
        const filter = document.getElementById('filter')

        const filterProd = () => {
            const value = filter.value

            if (value === "all") {
                renderCards(stockProductos)
            } else {
                const filtering = stockProductos.filter((prod) => prod.type === value)
                renderCards(filtering)
            }

        }

        filter.addEventListener('change', () => {
            filterProd()
        })
        // -------End of filter --------
    });

// ---- End Cards----

// -------Storage--------
function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerStorage(clave) {
    const valor = JSON.parse(localStorage.getItem(clave));
    return valor;
}


// -------Cart--------
let carrito = []
if (obtenerStorage('carrito') !== null) {
  carrito.push(...obtenerStorage('carrito'));  
}
console.log(carrito);
// -------End of Cart --------

// --Sacar unidad--
const eliminarCarrito = (prodId) => {
    let item = carrito.find((prod) => prod.id === prodId)
    if (carrito.find((prod) => prod.id === parseInt(prodId))) {
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

// --Vaciar carrito--
const vaciarCarrito = document.getElementById('vaciarCarrito')

vaciarCarrito.onclick = function () {
    carrito = [];
    guardarStorage('carrito', carrito);
    renderCarrito(carrito);
}

// --Comprar carrito--
const comprarCarrito = document.getElementById('buy')

comprarCarrito.onclick = function () {
    if (carrito == 0) {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: '¡El carrito está vacío!',
            showConfirmButton: false,
            timer: 1500,
            backdrop: ` rgba(233, 85, 80, 0.452)`
          })
    }else{
        carrito = [];
        guardarStorage('carrito', carrito);
        renderCarrito(carrito);
        Swal.fire({
            position: 'top',
            title: '¡Gracias por comprar nuestros productos!',
            width: 600,
            color: '#716add',
            imageUrl: 'https://gogeticons.com/frontend/web/icons/data/1/2/7/2/9/happy_512.png',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Happy guy',
            showConfirmButton: false,
            timer: 2000,
            backdrop: `rgba(0,0,123,0.4) `
          })
    }
    
}

// -------Print de Carrito--------

const obtenerCarrito = document.getElementById('carrito')
const totalizador = document.getElementById('totalizador')

function renderCarrito() {
    obtenerCarrito.innerHTML = ""


    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = "productoEnCarrito d-flex align-items-center"
        div.innerHTML = `
                    <div class="container">
                        <div class="row">
                          <div class="col">
                            <p class="card-text"><img src="${prod.img}" alt="" class="cart-img-added m-1"> ${prod.name}
                          </div>
                          <div class="col d-flex align-items-center justify-content-end">
                          <p >Precio: $${prod.precio} x ${prod.cantidad}
                          <button onclick="eliminarCarrito(${prod.id})" class="btn-added-cart"><i class="bi bi-dash-circle"></i></button>
                      </p>
                      
                        </p>
                      </div>
                        `

        obtenerCarrito.appendChild(div)
    })
    totalizador.innerText = carrito.reduce((acu, prod) => acu + prod.precio * prod.cantidad, 0)

}
renderCarrito(carrito);


// // ------- Fin de print de Carrito --------
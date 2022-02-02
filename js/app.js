// ---- Cards ----
fetch('../../js/stock.json')
    .then(response => response.json())
    .then(data => {
        const stockProductos = data

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
                    console.log(producto.id);
                })

            });
        }
        BtnGetId(stockProductos)
        // -------------End of getting button add to cart-----------

        const agregarCarrito = (prodId) => {
            let item = stockProductos.find((prod) => prod.id === parseInt(prodId))
            if (carrito.find((prod) => prod.id === parseInt(prodId))) {
                item.cantidad++;
                console.log(`Este es el sumador de la función "agregarCarrito" --> ${item.cantidad}`);
                console.log(carrito);
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
carrito.push(...obtenerStorage('carrito'));
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


const vaciarCarrito = document.getElementById('vaciarCarrito')

vaciarCarrito.onclick = function () {
    carrito = [];
    guardarStorage('carrito', carrito);
    renderCarrito(carrito);
}


// -------Print de Carrito--------

const obtenerCarrito = document.getElementById('carrito')
const totalizador = document.getElementById('totalizador')

function renderCarrito() {
    obtenerCarrito.innerHTML = ""


    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = "productoEnCarrito d-flex"
        div.innerHTML = `
                        <p class="card-text">${prod.name} Precio: $${prod.precio} x ${prod.cantidad}</p>
                        <button onclick="eliminarCarrito(${prod.id})" class="btn-quitar"><i class="bi bi-x-octagon btn-color-standard"></i></button>
                        `

        obtenerCarrito.appendChild(div)
    })
    totalizador.innerText = carrito.reduce((acu, prod) => acu + prod.precio * prod.cantidad, 0)

}
renderCarrito(carrito);


// // ------- Fin de print de Carrito --------
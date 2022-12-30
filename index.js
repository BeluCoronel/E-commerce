class productos {
    constructor ( id, nombre, imagen, categoria, edad, precio ){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.edad = edad;
        this.precio = precio;
    }
}

const arrayProductos = [
    new productos( 00, "A way out", "./Imagenes/awayout.jpg", "Aventura", 17, 1200),
    new productos( 01, "Assassins Creed: Valhalla", "./Imagenes/Assassins-Creed-Valhalla.jpg", "Aventura", 17, 1400),
    new productos( 02, "Among Us", "./Imagenes/among-us.jpg", "Aventura", 7, 2000),
    new productos( 03, "Cyberpunk", "./Imagenes/Cyberpunk.jpg", "Aventura", 16, 2400),
    new productos( 04, "Overccoked 2", "./Imagenes/overcooked2.jpg", "Cooperativo", 7, 3000),
    new productos( 05, "Final Fantasy XV", "./Imagenes/finalfantasyXV.jpg", "Aventura", 16, 2150),
    new productos( 06, "God of War", "./Imagenes/gow-ragnarok.jpg", "Aventura", 18, 2500),
    new productos( 07, "Little Big Planet 3", "./Imagenes/littlebigplanet3.jpg", "Disparo",16, 2150),
    new productos( 08, "Just Dance 2022", "./Imagenes/justdance2022.jpg", "Baile", 7, 4500),
]

const productosNuevos = document.querySelector(".container")

let carrito= []

for (let i = 0; i < arrayProductos.length; i++) {

    const card = document.createElement("div")
    card.className = "container__card"
    card.innerHTML = ` 
    <div class = "container__card__imagen">
    <img src= ${arrayProductos[i].imagen} alt="${arrayProductos[i].nombre}" 
    </div>
    <h2> ${arrayProductos[i].nombre}</h2>
    <h3> $${arrayProductos[i].precio}</h3>
    <button onclick="agregarAlCarrito(${arrayProductos[i].id})"> Agregar al carrito </button>
    `
    productosNuevos.appendChild(card)
}

function agregarAlCarrito (id) {
    carrito.push (arrayProductos[id])
    localStorage.setItem ("productoAgregado", JSON.stringify(carrito))
    productosCarrito()
}

const carritoContainer = document.querySelector (".container-carrito")

function productosCarrito () {
    carritoContainer.innerHTML=""
    let carritoLS = localStorage.getItem ("productoAgregado")
    let carritoLSParse = JSON.parse (carritoLS)
    let total= 0
    for (let i = 0; i < carritoLSParse.length; i++) {
        total+= carritoLSParse[i].precio
        const card = document.createElement("div")
        card.className = "container__card"
        card.innerHTML = ` 
        <div class = "container__card__imagen__carrito">
        <img class="imagen__carrito" src= ${carritoLSParse[i].imagen} alt="${carritoLSParse[i].nombre}">
        </div>
        <h2> ${carritoLSParse[i].nombre}</h2>
        <h3> $${carritoLSParse[i].precio}</h3>
        `
        carritoContainer.appendChild(card)
    }

    document.querySelector(".total").innerHTML=`Total=$${total}`
}


// Modo oscuro

const botonSwitch = document.querySelector ("#switch");


botonSwitch.addEventListener (`click`, () => {
    document.body.classList.toggle (`oscuro`);
    botonSwitch.classList.toggle (`active`);
    modoOscuro()
});

// Modo oscuro LS

if (localStorage.getItem(`modo-oscuro`) === `true`){
    document.body.classList.add(`oscuro`);
    botonSwitch.classList.add(`active`);}
else {
    document.body.classList.remove(`oscuro`);
    botonSwitch.classList.remove(`active`);
}



function modoOscuro () {
if (document.body.classList.contains(`oscuro`)){
localStorage.setItem(`modo-oscuro`, `true`);}
else {
    localStorage.setItem(`modo-oscuro`, `false`);
};
}


// Modal

function abrirModal (){
    $('.modal').modal('show');
}















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
    new productos( 00, "Spiderman: Miles Morales", "/spidermanmilesmorales.jpg", "Aventura", 12, "$1200"),
    new productos( 01, "Lego Avengers", "/spidermanmilesmorales.jpg", "Aventura", 7, "$1400"),
    new productos( 02, "Sonic", "/spidermanmilesmorales.jpg", "Aventura", 7, "$2000"),
    new productos( 03, "Fifa 2023", "/spidermanmilesmorales.jpg", "Deporte", 16, "$2400"),
    new productos( 04, "Mario Bross", "/spidermanmilesmorales.jpg", "Aventura", 7, "$1150"),
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
    <h3> ${arrayProductos[i].precio}</h3>
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
    for (let i = 0; i < carritoLSParse.length; i++) {

        const card = document.createElement("div")
        card.className = "container__card"
        card.innerHTML = ` 
        <div class = "container__card__imagen">
        <img src= ${carritoLSParse[i].imagen} alt="${carritoLSParse[i].nombre}" 
        </div>
        <h2> ${carritoLSParse[i].nombre}</h2>
        <h3> ${carritoLSParse[i].precio}</h3>
        `
        carritoContainer.appendChild(card)
    }
}


// Modo oscuro

const botonSwitch = document.querySelector ("#switch");
 botonSwitch.addEventListener ("click", () => {
    document.body.classList.toggle("oscuro");
    botonSwitch.classList.toggle("active");
 });








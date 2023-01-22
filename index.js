class productos {
    constructor(id, nombre, imagen, categoria, edad, precio, oferta) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.edad = edad;
        this.precio = precio;
        this.oferta = oferta;
    }
    
    obtenerOferta(porcentaje) {
        return this.precio * porcentaje; 
    }
}

let arrayProductos = [];
let arrayProductosOriginal = [];
const Descuentos = 0.8;

function ObtenerProductosDesdeJSON(){
    fetch('productos.json')
	.then(response => response.json())
    .then(response => {CrearProductos(response)})
	.catch(err => console.error(err));

}

ObtenerProductosDesdeJSON()

function CrearProductos(arrayDeProductosJson) {
    arrayDeProductosJson.forEach(producto => {
        arrayProductos.push(
            new productos(
                producto.id, 
                producto.nombre, 
                producto.imagen, 
                producto.categoria, 
                producto.edad, 
                producto.precio, 
                producto.oferta
            ));
    })

    arrayProductosOriginal = [...arrayProductos]
    cargarProductos(arrayProductos)
}



let carrito = []

function cargarProductos() {
    const productosNuevos = document.querySelector(".container")

    productosNuevos.innerHTML = "";

    for (let i = 0; i < arrayProductos.length; i++) {
        const card = document.createElement("div")
        card.className = "container__card"
        card.innerHTML = ` 
        <div class = "container__card__imagen">
            <img src= ${arrayProductos[i].imagen} alt="${arrayProductos[i].nombre}" 
        </div>
        <h2> ${arrayProductos[i].nombre}</h2>
        <h3> $${arrayProductos[i].precio}</h3>
        <h4 class ="oferta">${arrayProductos[i].oferta? "Oferta: $" + arrayProductos[i].obtenerOferta(Descuentos) : ""}</h4>
        <button onclick="agregarAlCarrito(${arrayProductos[i].id})" class= "boton"> Agregar al carrito </button>
        `
        productosNuevos.appendChild(card)
    }
}
function agregarAlCarrito(id) {
    carrito.push(arrayProductos.filter(x => x.id == id)[0])
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito))
    actualizarProductosEnElCarrito()
}


function EliminarProductoDelCarrito(id) {
    carrito.splice(id, 1);
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
    actualizarProductosEnElCarrito();
}


function VaciarCarrito() {
    carrito = [];
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
    actualizarProductosEnElCarrito();
}

const carritoContainer = document.querySelector(".container-carrito")

function actualizarProductosEnElCarrito() {
    //borra el html para reiniciarlo
    carritoContainer.innerHTML = ""

    //recrea el carrito
    let carritoLS = localStorage.getItem("carritoGuardado")
    let carritoLSParse = JSON.parse(carritoLS)
    let total = 0
    for (let i = 0; i < carritoLSParse.length; i++) {
        let precio =  carritoLSParse[i].oferta? carritoLSParse[i].precio * Descuentos :carritoLSParse[i].precio
        total += precio
        const card = document.createElement("div")
        card.className = "container__card"
        card.innerHTML = ` 
        <div class = "container__card__imagen__carrito">
        <img class="imagen__carrito" src= ${carritoLSParse[i].imagen} alt="${carritoLSParse[i].nombre}">
        </div>
        <h2> ${carritoLSParse[i].nombre}</h2>
        <h3> $${precio}</h3>
        <button onclick="EliminarProductoDelCarrito(${i})" class="eliminarProducto"> X </button>
        `
        carritoContainer.appendChild(card)
    }

    document.querySelector(".total").innerHTML = `Total=$${total}`

}


// Modo oscuro

const botonSwitch = document.querySelector("#switch");


botonSwitch.addEventListener(`click`, () => {
    document.body.classList.toggle(`oscuro`);
    botonSwitch.classList.toggle(`active`);
    modoOscuro()
});

// Modo oscuro LS

if (localStorage.getItem(`modo-oscuro`) === `true`) {
    document.body.classList.add(`oscuro`);
    botonSwitch.classList.add(`active`);
}
else {
    document.body.classList.remove(`oscuro`);
    botonSwitch.classList.remove(`active`);
}



function modoOscuro() {
    if (document.body.classList.contains(`oscuro`)) {
        localStorage.setItem(`modo-oscuro`, `true`);
    }
    else {
        localStorage.setItem(`modo-oscuro`, `false`);
    };
}


// Modal

function abrirModal() {
    $('.modal').modal('show');
}

function realizarCompra() {
    swal(" ¡Su compra fue exitosa! ", "¡Le enviaremos un mail con la información de su pedido!", "success");
    VaciarCarrito();
}

document.querySelector(".boton_comprar").onclick = () => {
    realizarCompra();
}

document.querySelector(".boton_vaciar").onclick = () => {
    PreguntarVaciarCarrito();
}

function PreguntarVaciarCarrito() {
    swal({
        title: "¿Desea vaciar el carrito?",
        text: "Una vez eliminado, no podrá volver atrás",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Carrito eliminado", {
                    icon: "success",
                });
                VaciarCarrito();

            } else { swal("Continuar con su compra"); }
        });
}




function busqueda(buscar) { return arrayProductos.filter(e => e.nombre.includes(buscar)) }


const select = document.querySelector(".select-ordenar-por");


select.addEventListener(`change`, () => {

ordenarProductos()

});

function ordenarProductos() {
    switch (select.value) {
        case `alfabetico_asc`:
            ordenarPorNombre("asc");
            break;
        case `alfabetico_desc`:
            ordenarPorNombre("desc");
            break;
        case `mayor_precio`:
            ordenarPorPrecio("mayor");
            break;
        case `menor_precio`:
            ordenarPorPrecio("menor");
            break;
    }

    cargarProductos()
}

const filter = document.querySelector(".select-filtrar-por");


filter.addEventListener(`change`, () => {

    arrayProductos = arrayProductosOriginal;

    if (filter.value != "" && filter.value != "Ofertas") {
        arrayProductos = arrayProductos.filter(x => x.categoria == filter.value)
    }
    if (filter.value != "" && filter.value == "Ofertas") {
        arrayProductos = arrayProductos.filter(x => x.oferta == true);
    }

    ordenarProductos()
    cargarProductos()

});


function ordenarPorNombre(tipo) {
    if (tipo == "asc") {
        arrayProductos.sort(function (a, b) {
            if (a.nombre > b.nombre) { return 1; }
            if (a.nombre < b.nombre) { return -1; }
            return 0;
        });
    }
    if (tipo == "desc") {
        arrayProductos.sort(function (a, b) {
            if (a.nombre > b.nombre) { return -1; }
            if (a.nombre < b.nombre) { return 1; }
            return 0;
        });
    }
}

function ordenarPorPrecio(precio) {
    if (precio == "mayor") {
        arrayProductos.sort(function (a, b) {
            if (a.precio > b.precio) { return -1; }
            if (a.precio < b.precio) { return 1; }
            return 0;
        });
    }
    if (precio == "menor") {
        arrayProductos.sort(function (a, b) {
            if (a.precio > b.precio) { return 1; }
            if (a.precio < b.precio) { return -1; }
            return 0;
        });
    }
}



// Formulario

let form = document.getElementsByClassName("contacto__form")[0];

async function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            swal("Gracias por contactarnos", {icon:"success"});

            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    swal(data["errors"].map(error => error["message"]).join(", "))
                } else {

                }
            })
        }
    }).catch(error => {
        swal("¡Oh no! Hubo un problema al enviar su mensaje")
    });
}
form.addEventListener("submit", handleSubmit)



// API juegos gratis

const juegosGratis = document.querySelectorAll(".juegos-gratis");


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2832426796msh114d5a1e9beec69p1cd661jsn1a19be4f9008',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
let juegos = []

fetch('https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc', options)
	.then(response => response.json())
	.then(response => {juegos = response; cargarJuegosGratis()})
	.catch(err => console.error(err));


    function cargarJuegosGratis() {
        const juegosGratis = document.querySelector(".container_juegosgratis")
    
        juegosGratis.innerHTML = "";
    
        for (let i = 0; i < 3; i++) {
            
            let num = Math.floor(Math.random() * (juegos.length));

            const card = document.createElement("div")
            card.className = "container__card"
            card.innerHTML = ` 
            <div class = "container__card__imagen">
            <img src= ${juegos[num].thumbnail} alt="${juegos[num].title}" 
            </div>
            <h2> ${juegos[num].title}</h2>
            <a href="${juegos[num].game_url}" class="button" target="_blank"><Button class="boton">Ir al juego</Button>  </a>
            `
            juegosGratis.appendChild(card)
        }
    }

    function mostrarContacto(esContacto){
        if (esContacto) {
            $(".section_body").hide();
            $(".section_contacto").show();
        } else {
            $(".section_body").show();
            $(".section_contacto").hide();
        }
    }


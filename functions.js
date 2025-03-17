const ListaProductos = window.Productos;

const GrillaProductos = document.querySelector('.grilla-productos');
const BotonCategorias = document.querySelectorAll('.boton-categorias');
const TituloProductos = document.querySelector('.titulo-productos');
var BotonTarjetas = document.querySelectorAll('.btn-sumar-carrito');
const ContenedorNumProductos = document.querySelector('.contenedor-cantidad-productos');
var NumProductosCarrito = document.querySelector('.numero-productos');
const InputBuscar = document.querySelector('.input-buscar');
const OrdenarPorSeleccion = document.querySelector('#ordenar-por');
const OpcionesOrdenar = document.querySelectorAll('option');

function CargarProductos(ProductosSeleccionados){
    
    GrillaProductos.innerHTML = '';

    let CartasProductos = '';

    ProductosSeleccionados.forEach(producto => {

        CartasProductos += 
        `
        <div class="carta-productos">
    
            <button class="btn-detalles-productos">
            <a href="${producto.imagen}">
                <img src="${producto.imagen}" alt="Imagen ${producto.nombre}">
            </a>
            </button>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button id="${producto.id}" class="btn-sumar-carrito">Sumar al carrito</button>
    
        </div>
        `;
    });

    GrillaProductos.innerHTML = CartasProductos;

    ActualizarBotonesTarjetas();
}

CargarProductos(ListaProductos);

BotonCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {

        TituloProductos.textContent = boton.textContent;

        let ListaProductosFiltrada = ListaProductos.filter(producto => producto.categoria == boton.id);

        let OpcionOrdenSeleccionado = OrdenarPorSeleccion.value;

        OrdenarCargaProductos(ListaProductosFiltrada, OpcionOrdenSeleccionado);
    });
});

let Carrito;

const CarritoLocalStorage = JSON.parse(localStorage.getItem('productos-en-carrito'));

if(CarritoLocalStorage){
    Carrito = CarritoLocalStorage;
    ActualizarNumProductosCarrito();
}
else{
    Carrito = [];
}

function ActualizarBotonesTarjetas(){

    BotonTarjetas = document.querySelectorAll('.btn-sumar-carrito');

    BotonTarjetas.forEach(boton => {
        boton.addEventListener('click',(_AgregarAlCarrito) => {

            let id_tarjeta = _AgregarAlCarrito.currentTarget.id;
            let ProductoSeleccionado = ListaProductos.find(producto => producto.id == id_tarjeta)

            if(Carrito.some(producto => producto.id == id_tarjeta)){
                let IndiceCarrito = Carrito.findIndex(producto => producto.id == id_tarjeta);
                Carrito[IndiceCarrito].CantidadSolicitada++;
            }
            else{
                Carrito.push(ProductoSeleccionado);
            }

            ActualizarNumProductosCarrito();

            localStorage.setItem('productos-en-carrito', JSON.stringify(Carrito));
        });
    })
}

function ActualizarNumProductosCarrito(){
    let NumProductos = Carrito.reduce((acumulador, producto) => acumulador + producto.CantidadSolicitada, 0);

    if(NumProductos > 0){
        ContenedorNumProductos.classList.remove('desactivar');
        NumProductosCarrito.textContent = NumProductos;
    }
    else{
        NumProductosCarrito.textContent = '';
        ContenedorNumProductos.classList.add('desactivar');
    }
}

InputBuscar.addEventListener('keyup', (e) => {
    
    let Solicitud = InputBuscar.value.trim().toLowerCase();
    let OpcionOrdenSeleccionado = OrdenarPorSeleccion.value;
    let Productos = [];

    TituloProductos.textContent = `Resultados para "${Solicitud}"`;
        
    ListaProductos.forEach(producto => {
        if(producto.nombre.toLowerCase().includes(Solicitud)){
            Productos.push(producto);
        }
    });

    OrdenarCargaProductos(Productos, OpcionOrdenSeleccionado);
});

OrdenarPorSeleccion.addEventListener('change', (e) => {

    let OpcionOrdenSeleccionado = OrdenarPorSeleccion.value;

    let ProductosEnPantalla = [];
    
    BotonTarjetas.forEach(boton => {
        ProductosEnPantalla.push(ListaProductos.find(producto => producto.id == boton.id));
    });

    if('opcion-mayor-precio' == OpcionOrdenSeleccionado){
        ProductosOrdenados = ProductosEnPantalla.sort((a, b) => b.precio - a.precio);
        CargarProductos(ProductosOrdenados);
    }
    else if('opcion-menor-precio' == OpcionOrdenSeleccionado){
        ProductosOrdenados = ProductosEnPantalla.sort((a, b) => a.precio - b.precio);
        CargarProductos(ProductosOrdenados);
    }
    else{
        CargarProductos(ListaProductos);
    }
});

function OrdenarCargaProductos(Productos, OpcionOrdenSeleccionado){

    switch(OpcionOrdenSeleccionado){
        case 'opcion-todos-los-productos':
            CargarProductos(Productos);
            break;
        case 'opcion-mayor-precio':
            Productos = Productos.sort((a, b) => b.precio - a.precio);
            CargarProductos(Productos);
            break;
        case 'opcion-menor-precio':
            Productos = Productos.sort((a, b) => a.precio - b.precio);
            CargarProductos(Productos);
            break;
    }
}

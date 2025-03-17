let CarritoProductos = localStorage.getItem('productos-en-carrito');
CarritoProductos = JSON.parse(CarritoProductos);

const GrillaProductos = document.querySelector('.grilla-productos');
const TotalProductos = document.querySelector('#total');
const MensajeEstado = document.querySelector('#mensaje-estado');
const VaciarCarrito = document.querySelector('#vaciar-carrito');
var BotonesEliminar = document.querySelectorAll('btn-borrar');
const Acciones = document.querySelector('.acciones');
const ComprarCarrito = document.querySelector('.btn-comprar');

function CargarProductosCarrito(){

    if(CarritoProductos && CarritoProductos.length > 0){

        GrillaProductos.innerHTML = '';

        MensajeEstado.textContent = '';
    
        let CartaProductos = '';
    
        CarritoProductos.forEach(producto => {
    
            CartaProductos += `
                <div class="carta-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="nombre-producto">
                        <small> Nombre </small>
                        <h4> ${producto.nombre} </h4>
                    </div>
                    <div class="precio-producto">
                        <small> Precio </small>
                        <h4> $${producto.precio} </h4>
                    </div>
                    <div class="cantidad-producto">
                        <small> Cantidad </small>
                        <h4> ${producto.CantidadSolicitada} </h4>
                    </div>
                    <div class="subtotal-producto">
                        <small> Subtotal </small>
                        <h4> $${(producto.precio * producto.CantidadSolicitada)} </h4>
                    </div>
                    <button id="${producto.id}" class="btn-borrar">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            `;
    
        });
        
        GrillaProductos.innerHTML = CartaProductos;
    
        ActualizarBotonesEliminar();

        ActualizarTotal();

    }
    else{
        GrillaProductos.innerHTML = '';
        Acciones.innerHTML = '';
        MensajeEstado.textContent = 'No hay productos en el carrito';
    }
}

CargarProductosCarrito();

function ActualizarTotal(){
    let total = 0;

    CarritoProductos.forEach(producto => {
        total += producto.precio * producto.CantidadSolicitada;
    });

    TotalProductos.textContent = `$${total}`;
}

function ActualizarBotonesEliminar(){

    BotonesEliminar = document.querySelectorAll('.btn-borrar');

    BotonesEliminar.forEach(boton => {
        boton.addEventListener('click',(_EliminarDelCarrito) => {

            let id_BotonEliminar = _EliminarDelCarrito.currentTarget.id;

            let IndiceCarrito = CarritoProductos.findIndex(producto => producto.id == id_BotonEliminar);

            CarritoProductos.splice(IndiceCarrito, 1);

            CargarProductosCarrito();

            localStorage.setItem('productos-en-carrito', JSON.stringify(CarritoProductos));
        });

    });
}

ComprarCarrito.addEventListener('click', (e) => {

    CarritoProductos.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(CarritoProductos));
    CargarProductosCarrito();
    MensajeEstado.textContent = '¡Muchas gracias por su compra!';

});

VaciarCarrito.addEventListener('click', (e) => {

    CarritoProductos.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(CarritoProductos));
    CargarProductosCarrito();
    
});

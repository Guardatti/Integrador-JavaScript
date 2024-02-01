

// Botón para abrir y cerrar el menú
const menuBtn = document.querySelector('.container-menu');

// Menú hamburguesa
const barsMenu = document.querySelector('.navbar-list');

// Overlay
const overlay = document.querySelector('.overlay');

// Botón que es el icono del carrito
const cartBtn = document.querySelector('.container-cart');

// Botón que es el icono del menú
const cartMenu = document.querySelector('.menu-cart');


// Abrir y cerrar carrito
const toggleCart = () => {
    cartMenu.classList.toggle('open-cart')
    // Si el menu hamburguesa esta abierto, entro a su classlist y le remuevo open-menu
    if (barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu')
        return
    }
    overlay.classList.toggle('show-overlay')
}

// Abrir y cerrar menu
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu')
    // Si el menu del carrito esta abierto, entro a su classlist y le remuevo el open-cart
    if (cartMenu.classList.contains('open-cart')) {
        cartMenu.classList.remove('open-cart')
        return
    }
    overlay.classList.toggle('show-overlay')
}

// Que se cierre el menu si se scrollea cuando uso portada, nosotros, productos o contacto.
const closeOnScroll = () => {
    // Si el menu y el carrito estan cerrados retorno 
    if (!barsMenu.classList.contains('open-menu') && !cartMenu.classList.contains('open-cart')){
        return
    }
    barsMenu.classList.remove('open-menu')
    cartMenu.classList.remove('open-cart')
    overlay.classList.remove('show-overlay')
}

// Funcion para cerrar el menu si se clickea en una seccion que se esta en la pagina y no hace scroll.
const closeOnClick = (e) => {
    // Si no es un link, retorno
    if (!e.target.classList.contains('navbar-link')){
        return
    }
    barsMenu.classList.remove('open-menu')
    overlay.classList.remove('show-overlay')
}

// Funcion para cerrar el menu o el carrito si aprieto en overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu')
    cartMenu.classList.remove('open-cart')
    overlay.classList.remove('show-overlay')
}

export const menuInterfaceInit = () => {
    cartBtn.addEventListener('click', toggleCart)
    menuBtn.addEventListener('click', toggleMenu)
    window.addEventListener('scroll', closeOnScroll)
    barsMenu.addEventListener('click', closeOnClick)
    overlay.addEventListener('click', closeOnOverlayClick)
}
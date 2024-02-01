// Si no tengo nada en el LocalStorage va usar el array vacio | Si hay algo en el LocalStorage se va usar el JSON.parse
let cart =  JSON.parse(localStorage.getItem('cart')) || [];

// Contenedor de productos del carrito
const productsCart = document.querySelector('.container-compra');

// Total del precio del carrito
const total = document.querySelector('.total');

// Botón de comprar
const btnComprar = document.querySelector('.btn-comprar');

// Burbuja que muestra la cantidad de productos del carrito
const cartBubble = document.querySelector('.cart-bubble');

// Boton de vaciar carrito
const btnVaciar = document.querySelector('.btn-vaciar');

// Modal agregado al carrito
const succesModal = document.querySelector('.add-modal');

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

// Renderizado de carrito y templado del carrito
const createCartProductTemplate = (cartProduct) => {
    const {id, nombre, precio, img, quantity} = cartProduct
    return `
    <div class="cart-item">
        <img class="img-product-cart" src="${img}" alt="Producto del carrito"/>
        <div class="item-info">
            <h3 class="item-title">${nombre}</h3>
            <span class="item-price">$${precio}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>`
}

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`
        return
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("")
}

// Mostrado del total del precio
const getCartTotal = () => {
    return cart.reduce((acumulador, current) => acumulador + Number(current.precio)* current.quantity, 0)
}

const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}`
}

// Mostrado de cantidad en el cart-bubble
const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acumulador, current) => acumulador + current.quantity, 0)
}

// Desabilitado de boton comprar y vaciar si no hay nada en el carrito
const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add('disabled')
    } else{
        btn.classList.remove('disabled')
    }
}

// Funcion para actualizar el estado del carrito
const upDateCartSate = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(btnComprar);
    disableBtn(btnVaciar);
    renderCartBubble();
}

// Agregado del producto al carrito
export const addProduct = (e) => {
    // Si donde hice click no contiene el btn-add retorno
    if (!e.target.classList.contains('btn-add')) {
        return
    }
    const product = createProductData(e.target.dataset)
    // Si el producto existe en el carrito le agrego una unidad
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product)
        showModalSucces('Se agregó una unidad del producto')
    } else { // Si no existe el producto en el carrito lo creo
        createCartProduct(product)
        showModalSucces('El producto se agregó al carrito')
    }
    // Actualizo el estado del carrito
    upDateCartSate();
}

// Muestro el succesModal (Se va mostrar que se agrego el producto al carrito y despues de 1 segundo y medio desaparece el cartel de aviso)
const showModalSucces = (msg) => {
    succesModal.classList.add('active-modal')
    succesModal.textContent = msg;
    setTimeout(() => {
        succesModal.classList.remove('active-modal')
    }, 1500);
}

// Cart va tener todos los datos que ya tenia (...cart) y además agregamos un objeto mas ({...product, quantity: 1})
const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}]
}

// Sumamos una unidad al producto si son iguales, sino devuelvo cartProduct
const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === product.id ? {...cartProduct, quantity: Number(cartProduct.quantity) + 1} : cartProduct
    })
}

//Si coincide el producto con el que esta agregando retorno 
const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id)
}

const createProductData = (product) => {
    const {id, nombre, precio, img} = product
    return {id, nombre, precio, img}
}

// Sumar y restar con el hadle down y handle up
const handleQuantity = (e) => {
    // Si el boton es -
    if (e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains('up')) { // Si el boton es el de +
        handlePlusBtnEvent(e.target.dataset.id)
    }
    //Actualizar el estado del carrito
    upDateCartSate();
}

// Manejador del boton -
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id)
    if (existingCartProduct.quantity === 1) {
        if (window.confirm('¿Desea eliminar el producto del carrito?')) {
            removeProductFromCart(existingCartProduct)
        }
        return
    }
    substractProductUnit(existingCartProduct)
}

// Funcion para restar una unidad al producto
const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id ? {...product, quantity: Number(product.quantity) - 1} : product
    })
}

// Funcion para eliminar el producto del carrito
const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id)
    upDateCartSate()
}

// Manejadoir del boton +
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id)
    addUnitToProduct(existingCartProduct)
}

// Funciones de compra y vaciar carrito
const resetCartItems = () => {
    cart = [];
    upDateCartSate()
}

const completeCartAction = (confirmMsg, succesMsg) => {
    if (!cart.length) {
        return      
    }

    if (window.confirm(confirmMsg)) {
        resetCartItems()
        alert(succesMsg)
    }
}

const completeBuy = () => {
    completeCartAction('¿Desea completar su compra?', '¡Gracias por su compra!')
}

const deleteCart = () => {
    completeCartAction('¿Desea eliminar todos los productos del carrito?', 'Se han eliminado los productos del carrito')
}

export const cartActionInit = () => {
    productsCart.addEventListener('click', handleQuantity);
    btnComprar.addEventListener('click', completeBuy);
    btnVaciar.addEventListener('click', deleteCart);
    disableBtn(btnComprar);
    disableBtn(btnVaciar);
    renderCartBubble();
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
}
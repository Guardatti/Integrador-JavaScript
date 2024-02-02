import { appState, vProductos } from "../data/data";
import { addProduct } from "../cart/cart";

// Contenedor de productos
const containerProductos = document.querySelector('.container-productos');

// Contenedor de categorias
const categoriesContainer = document.querySelector('.container-category');

// htmlCollection de botones de todas las categorias
const categoriesList = document.querySelectorAll('.btn-category');

// Botón de ver más
const showMoreBtn = document.querySelector('.btn-load');

// Renderizado de productos
const createProductTemplate = (product) => {
    const {id, nombre, precio, img} = product
    return `
    <div class="product">
        <img class="img-product" src="${img}" alt=${nombre}>
        <div class="product-info">
            <div class="product-top">
                <h3>${nombre}</h3>
            </div>
            <div class="product-mid">
                <span>$${precio}</span>
            </div>
            <div class="product-bot">
                <img class="logo" src="imagenes/logotipo.png">
                <button class="btn-add" data-id='${id}' data-nombre='${nombre}' data-precio='${precio}' data-img='${img}'>Add</button>
            </div>
        </div>
    </div>`
}

const renderProducts = (productsList) => {
    containerProductos.innerHTML += productsList.map(createProductTemplate).join("")
}

// Mostrado de más productos y ocultando btn (el index empieza en 0 y el length en 1, por eso le resto -1 al appstate.productLimit)
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productLimit - 1
}

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add('hidden')
    }
}

// Uso de filtros (Todos, Remeras, Pantalones, Zapatillas)
const setShowMoreVisitibilty = () => {
    // Si no hay filtro activado se muestra el boton, si hay filtro activado el boton se oculta
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove('hidden')
        return
    }
    showMoreBtn.classList.add('hidden')
}

const changeBtnActiveState = (selectedCategory) => { // Esta función recibe la categoría seleccionada
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        // Si el boton que esta dentro del array que estamos iterando, osea la categoria de ese boton, no es igual a la categoria seleccionada le sacamos la clase active
        // Si es igual a la categoria seleccionada le agrego la clase active
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove('active')
            return
        }
        categoryBtn.classList.add('active')
    })
}

const changeFilterState = (btn) => { // Recibe el boton al cual se le hizo click
    appState.activeFilter = btn.dataset.category; //dataset.category hace referencia al data-category
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisitibilty(appState.activeFilter);
}

const applyFilter = ({target}) => {
    // Aca vemos si el filtro ya esta activo
    if (!isInactiveFilterBtn(target)) {
        return
    }
    changeFilterState(target); // Aca cambiamos el estado del filtro
    containerProductos.innerHTML = ''; // Elimino productos del container
    // Si hay filtros activados renderizo los productos filtrados y devuelvo el index de productos a 0
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return
    }
    // Llamamos a la funcion renderizadora por ultimo
    renderProducts(appState.products[0])
}

const isInactiveFilterBtn = (element) => {
    return(
        element.classList.contains('btn-category') && !element.classList.contains('active') // Se retorna si tiene la clase btn-category y no contiene la clase active
    )
}

const renderFilteredProducts = () => {
    // filteredProducts va tener un array de productos que sean de la categoria que este activa
    // Luego le paso a renerProducts el filteredProducts para que se muestren esos productos nada mas
    const filteredProducts = vProductos.filter((products) => {
        return products.categoria === appState.activeFilter
    })
    renderProducts(filteredProducts)
}

export const productsSectionInit = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener('click', showMoreProducts);
    categoriesContainer.addEventListener('click', applyFilter);
    containerProductos.addEventListener('click', addProduct)
}
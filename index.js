import { cartActionInit } from "./assets/cart/cart";
import { menuInterfaceInit } from "./assets/menu-interface/menu-interface";
import { productsSectionInit } from "./assets/products-section/products-section";
import { scrollEfectInit } from "./assets/scrollefects/scroll";

//Funcion iniciadora
const init = () => {
    productsSectionInit();
    cartActionInit();
    menuInterfaceInit();
    scrollEfectInit();
};

init();


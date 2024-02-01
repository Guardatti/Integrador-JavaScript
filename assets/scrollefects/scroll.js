import ScrollReveal from "scrollreveal";

const nosotrosSection = document.getElementById('Nosotros')
const productosSection = document.getElementById('Productos')
const contactoSection = document.getElementById('Contacto')

const revealSection = (section) => {
    ScrollReveal().reveal(section, {
        delay: 200,
        distance: '500px',
        duration: 1000,
        origin: 'left',
        reset: false,
    });
};

export const scrollEfectInit = () => {
    revealSection(nosotrosSection)
    revealSection(productosSection)
    revealSection(contactoSection)
}
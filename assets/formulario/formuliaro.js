// Nombre
const nombre = document.getElementById('name')

// Celular
const celular = document.getElementById('tel')

// Email
const email = document.getElementById('email')

// Textarea
const textTarea = document.getElementById('msj')

// Formulario
const form = document.getElementById('form')




const functionBlurName = (e) => {
    const nameValue = e.target.value
    if (nameValue.length === 0) {
        nombre.style.border = '2px solid red'
    } else {
        nombre.style.border = '2px solid green'
    }
}

const functionBlurPhone = (e) => {
    const regex = RegExp(/^\d{7,14}$/)
    const phoneValue = e.target.value
    if (phoneValue.length < 10) {
        celular.style.border = '2px solid red'
    } else if (phoneValue.length >= 10 && !regex.test(phoneValue)) {
        celular.style.border = '2px solid red'
    } else{
        celular.style.border = '2px solid green'
    }
}

const functionBlurEmail = (e) => {
    const regex = RegExp(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
    const emailValue = e.target.value
    if (emailValue.length === 0) {
        email.style.border = '2px solid red'
    } else if (emailValue.length > 0 && !regex.test(emailValue)){
        email.style.border = '2px solid red'
    } else{
        email.style.border = '2px solid green'
    }
}

const funcionBlurTextTarea = (e) => {
    const textTareaValue = e.target.value
    if (textTareaValue.length <= 0) {
        textTarea.style.border = '2px solid red'
    } else{
        textTarea.style.border = '2px solid green'
    }
}

const sendForm = (e) => {
    e.preventDefault()

    if (nombre.style.border !== '2px solid green' || celular.style.border !== '2px solid green' || email.style.border !== '2px solid green' || textTarea.style.border !== '2px solid green') {
        return
    }

    if (window.confirm('¿Desea enviar el formulario?')) {
        alert('Formulario enviado con éxito')
        form.reset()
        nombre.style.border = ''
        celular.style.border = ''
        email.style.border = ''
        textTarea.style.border = ''
    }
}
export const formularioInit = () => {
    nombre.addEventListener('blur', functionBlurName)
    celular.addEventListener('blur', functionBlurPhone)
    email.addEventListener('blur', functionBlurEmail)
    textTarea.addEventListener('blur', funcionBlurTextTarea)
    form.addEventListener('submit', sendForm)
}
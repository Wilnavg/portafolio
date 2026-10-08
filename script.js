const boton = document.getElementById("saludoBtn");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function() {
    mensaje.textContent = "¡Hola! Soy Willian y estoy aprendiendo Full Stack Development.";
});

let edad = 18;

if (edad < 13) {
    console.log("Eres niño");
} else if (edad < 18) {
    console.log("Eres adolescente");
} else {
    console.log("Eres adulto");
}

function saludar(nombre) {
    console.log("Hola " + nombre);
}

saludar("Willian");
saludar("Carlos");
saludar("Ana");

function sumar(a, b) {
    return a + b;
}

let resultado = sumar(10, 5);

console.log(resultado);

function calcularEdadProximoAnio(edad) {
    return edad + 1;
}

let miEdad = 26;

let edadProxima = calcularEdadProximoAnio(miEdad);

console.log("El próximo año tendré " + edadProxima + " años");

let tecnologias = ["HTML", "CSS", "JavaScript"];

console.log(tecnologias);

console.log(tecnologias[0]);
console.log(tecnologias[1]);
console.log(tecnologias[2]);

tecnologias.push("React");

console.log(tecnologias);

tecnologias.push("Node.js");

const lista = document.getElementById("listaTecnologias");

for (let i = 0; i < tecnologias.length; i++) {
    const elemento = document.createElement("li");

    elemento.textContent = tecnologias[i];

    lista.appendChild(elemento);
}


console.log(tecnologias);

for (let i = 0; i < tecnologias.length; i++) {
    console.log(tecnologias[i]);
}

const proyectos = [
    {
        nombre: "Mi Portfolio",
        descripcion: "Mi primer proyecto como Developer.",
        enlace: "https://github.com/Wilnavg/portafolio"
    },
    {
        nombre: "Portal Estudiantil",
        descripcion: "Aplicación Android para gestión de estudiantes.",
        enlace: "#"
    }
];

const listaProyectos = document.getElementById("listaProyectos");

for (let i = 0; i < proyectos.length; i++) {
    const proyecto = document.createElement("article");

    proyecto.innerHTML = `
        <h3>${proyectos[i].nombre}</h3>
        <p>${proyectos[i].descripcion}</p>
        <a href="${proyectos[i].enlace}" target="_blank">Ver proyecto</a>
    `;
    

    listaProyectos.appendChild(proyecto);
}

const formulario = document.getElementById("formularioContacto");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensajeContacto").value;
    const resultado = document.getElementById("resultadoFormulario");

    if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
        resultado.textContent = "Por favor, completa todos los campos.";
        resultado.className = "error";
    } else if (!email.includes("@") || !email.includes(".")) {
        resultado.textContent = "Por favor, escribe un email válido.";
        resultado.className = "error";
    } else {
        resultado.textContent = "¡Mensaje enviado correctamente!";
        resultado.className = "exito";
        formulario.reset();
    }
});



    









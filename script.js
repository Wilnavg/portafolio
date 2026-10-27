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

let resultadoSuma = sumar(10, 5);

console.log(resultadoSuma);

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

const listaProyectos = document.getElementById("listaProyectos");

listaProyectos.textContent = "Cargando proyectos...";
fetch("http://localhost:3000/api/proyectos")
    .then(function(respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error al obtener los proyectos.");
        }

        return respuesta.json();
    })
    .then(function(proyectos) {
        listaProyectos.textContent = "";
        for (let i = 0; i < proyectos.length; i++) {
            const proyecto = document.createElement("article");
            Element("h3");
            titulo.textContent = proyectos[i].nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = proyectos[i].descripcion;

            const tecnologia = document.createElement("p");
            tecnologia.textContent = "Tecnología: " + proyectos[i].tecnologia;

            const estado = document.createElement("p");
            estado.textContent = "Estado: " + proyectos[i].estado;

            const enlace = document.createElement("a");
            enlace.textContent = "Ver proyecto en GitHub";
            enlace.href = proyectos[i].enlace;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";

            proyecto.appendChild(titulo);
            proyecto.appendChild(descripcion);
            proyecto.appendChild(tecnologia);
            proyecto.appendChild(estado);
            proyecto.appendChild(enlace);


        listaProyectos.appendChild(proyecto);
    }
})
.catch(function(error) {
    console.log("Error al cargar los proyectos:", error);
    listaProyectos.textContent = "No se pudieron cargar los proyectos.";
});




const formulario = document.getElementById("formularioContacto");
const resultado = document.getElementById("resultadoFormulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensajeContacto").value;


    if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
        resultado.textContent = "Por favor, completa todos los campos.";
        resultado.className = "error";


    } else if (!email.includes("@") || !email.includes(".")) {
        resultado.textContent = "Por favor, escribe un email válido.";
        resultado.className = "error";

    } else {
    resultado.textContent = "Enviando mensaje...";
    resultado.className = "";

    fetch("http://localhost:3000/api/contacto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            mensaje: mensaje
        })
    })
    .then(function(respuesta) {
        return respuesta.json().then(function(datos) {
            if (!respuesta.ok) {
                throw new Error(datos.error || "No se pudo enviar el mensaje.");
            }
            return datos;
        });
    })
    .then(function(datos) {
        resultado.textContent = datos.mensaje;
        resultado.className = "exito";
        formulario.reset();
    })
    .catch(function(error) {
        console.log("Error al enviar el mensaje:", error);
        resultado.textContent = "No se pudo enviar el mensaje. Inténtalo nuevamente.";
        resultado.className = "error";
    });
}
});

formulario.addEventListener("input", function() {
    resultado.textContent = "";
    resultado.className = "";
});





fetch("http://localhost:3000/api/mensaje")
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos) {
        const titulo = document.getElementById("tituloServidor");
        const contenido = document.getElementById("contenidoServidor");

        titulo.textContent = datos.mensaje;
        contenido.textContent = "Autor: " + datos.autor
            + " | Proyecto: " + datos.proyecto;

        console.log("Datos recibidos de mi backend:");
        console.log(datos);
    })
    .catch(function(error) {
        console.log("Error al conectar con mi backend:", error);
    });


const listaContactos = document.getElementById("listaContactos");















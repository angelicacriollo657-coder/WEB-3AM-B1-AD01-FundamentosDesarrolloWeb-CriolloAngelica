const formulario=document.getElementById('formulario')

//INSCRIPCION DE SERVICIO
const selServicio=document.getElementById("servicio");
const resultado=document.getElementById("resultado");
const mensajeResultado=document.getElementById("mensajeResultado");

//diccionario de precios
const precio={
    "correc":"70 dólares.",
    "preven":"50 dólares.",
    "abc":"40 dólares."
}

//diccionario de fechas
const fecha={
    "correc":"jueves.",
    "preven":"lunes y martes.",
    "abc":"sábados."
}

//diccionario de horas
const hora={
    "correc":"10:00 a.m.",
    "preven":"14:00 p.m.",
    "abc":"9:00 a.m."
}

formulario.addEventListener("submit", function(e){
    e.preventDefault(); //evita que se recargue la pagina

    // Capturamos la op seleccionado
    let servicioSeleccionado = selServicio.value; 

    // obtenemos todos los valores de loos texbox 
    const nuevaReserva = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        celular: document.getElementById("celular").value.trim(),
        placa: document.getElementById("placa").value.trim(),
        marca: document.getElementById("marca").value.trim(),
        modelo: document.getElementById("modelo").value.trim(),
        // y del combox
        servicio: selServicio.options[selServicio.selectedIndex].text,
        kilometraje: document.getElementById("kilometraje").value.trim() + " km",
        estado: "Pendiente",
        fecha: fechaServicio, 
        hora: horaServicio
    };

    // creamos un array
    let listaReservas = JSON.parse(localStorage.getItem("reservasAUTOCARS")) || [];

    // la nueva reserva a la lista
    listaReservas.push(nuevaReserva);

    // se guardar la lista actualizada
    localStorage.setItem("reservasAUTOCARS", JSON.stringify(listaReservas));

    // Buscamos los datos correctos dentro de los diccionarios
    let precioServicio = precio[servicioSeleccionado];
    let fechaServicio = fecha[servicioSeleccionado];
    let horaServicio = hora[servicioSeleccionado];

    mensajeResultado.innerHTML = `
        <strong>Precio: </strong> ${precioServicio} <br>
        <strong>Fecha disponible: </strong> ${fechaServicio} <br>
        <strong>Hora disponible: </strong> ${horaServicio}
    `;

    //indicamos el mensaje oculto
    resultado.style.display="block";

    //limpi los texbox
    //formulario.reset();
});

//validacion letrasss
function validarSoloLetras(idInput, idError) {
    const input = document.getElementById(idInput);
    const errorMsg = document.getElementById(idError);

    if (input) {
        input.addEventListener("input", function () {
            let valorActual = input.value;
            
            let regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

            if (regexLetras.test(valorActual)) {
                if (errorMsg) errorMsg.style.display = "none";
            } else {
                if (errorMsg) errorMsg.style.display = "block";
                // Limpia el texto borrando automáticamente números o símbolos
                input.value = valorActual.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
            }
        });
    }
}

// a campos que necesitan
validarSoloLetras("nombre", "errorNombre");
validarSoloLetras("marca", "errorMarca");
validarSoloLetras("modelo", "errorModelo");

//validación números
function validarSoloNumeros(idInput, idError) {
    const input = document.getElementById(idInput);
    const errorMsg = document.getElementById(idError);

    if (input) {
        input.addEventListener("input", function () {
            let valorActual = input.value;
            // Expresión regular que solo permite números del 0 al 9
            let regex = /^[0-9]*$/;

            if (regex.test(valorActual)) {
                if (errorMsg) errorMsg.style.display = "none";
            } else {
                if (errorMsg) errorMsg.style.display = "block";
                // Limpia y borra cualquier letra o símbolo que no sea número
                input.value = valorActual.replace(/[^0-9]/g, "");
            }
        });
    }
}

// a campos que necesitan
validarSoloNumeros("celular", "errorCelular");
validarSoloNumeros("kilometraje", "errorKilometraje");


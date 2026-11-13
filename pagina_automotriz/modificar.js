window.addEventListener('DOMContentLoaded', function() {
    const formModificar = document.getElementById("formularioModi");
    const indiceEdicion = localStorage.getItem("indiceEdicion");

    // Cargamos los datos actuales en los inputs
    let listaReservas = JSON.parse(localStorage.getItem("reservasAUTOCARS")) || [];
    const reservaAModificar = listaReservas[indiceEdicion];

    const diccionarioFechas = {
        "correc": "jueves.",
        "preven": "lunes y martes.",
        "abc": "sábados."
    };

    const diccionarioHoras = {
        "correc": "10:00 a.m.",
        "preven": "14:00 p.m.",
        "abc": "9:00 a.m."
    };

    if (reservaAModificar) {
        document.getElementById("nombre").value = reservaAModificar.nombre || "";
        document.getElementById("correo").value = reservaAModificar.correo || "";
        document.getElementById("celular").value = reservaAModificar.celular || "";
        document.getElementById("placa").value = reservaAModificar.placa || "";
        document.getElementById("marca").value = reservaAModificar.marca || "";
        document.getElementById("modelo").value = reservaAModificar.modelo || "";
        document.getElementById("servicio").value = reservaAModificar.servicio || "";
        document.getElementById("kilometraje").value = reservaAModificar.kilometraje || "";
        
        const inputFecha = document.getElementById("fecha");
        const inputHora = document.getElementById("hora");
        if (inputFecha) inputFecha.value = reservaAModificar.fecha || "";
        if (inputHora) inputHora.value = reservaAModificar.hora || "";
    }

    // para guardar
    if (formModificar) {
        formModificar.addEventListener("submit", function(e) {
            e.preventDefault();

            // Actualizamos los datos con lo que esté escrito en los inputs
            listaReservas[indiceEdicion].nombre = document.getElementById("nombre").value.trim();
            listaReservas[indiceEdicion].correo = document.getElementById("correo").value.trim();
            listaReservas[indiceEdicion].celular = document.getElementById("celular").value.trim();
            listaReservas[indiceEdicion].placa = document.getElementById("placa").value.trim();
            listaReservas[indiceEdicion].marca = document.getElementById("marca").value.trim();
            listaReservas[indiceEdicion].modelo = document.getElementById("modelo").value.trim();
            
            ico = document.getElementById("modelo").value.trim();
            listaReservas[indiceEdicion].modelo = ico;
            
            const textoServicio = document.getElementById("servicio").value.trim().toLowerCase();
            listaReservas[indiceEdicion].servicio = document.getElementById("servicio").value.trim();

            //asignar fecha y hora
            if (textoServicio.includes("abc")) {
                listaReservas[indiceEdicion].fecha = diccionarioFechas["abc"];
                listaReservas[indiceEdicion].hora = diccionarioHoras["abc"];
            } else if (textoServicio.includes("preven")) {
                listaReservas[indiceEdicion].fecha = diccionarioFechas["preven"];
                listaReservas[indiceEdicion].hora = diccionarioHoras["preven"];
            } else {
                listaReservas[indiceEdicion].fecha = diccionarioFechas["correc"];
                listaReservas[indiceEdicion].hora = diccionarioHoras["correc"];
            }

            listaReservas[indiceEdicion].kilometraje = document.getElementById("kilometraje").value.trim();

            //guarda el array actualizado
            localStorage.setItem("reservasAUTOCARS", JSON.stringify(listaReservas));

            // limpia el indice
            localStorage.removeItem("indiceEdicion");

            alert("¡Reserva actualizada con éxito!");

            // regreso automatico
            window.location.href = "adim.html";
        });
    }
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
validarSoloLetras("servicio", "errorServicio");

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
validarSoloNumeros("hora", "errorHora");
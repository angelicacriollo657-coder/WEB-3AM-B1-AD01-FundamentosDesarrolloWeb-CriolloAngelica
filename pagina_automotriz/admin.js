
window.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById("reservas");

    // variable para recordar cual se esta editando
    let indiceEdicion = null;
    
    if (!tbody) return; // Si no estamos en la página de admin, no hace nada

    function cargarTabla(){
        // Recuperamos la lista de reservas del localStorage
        let listaReservas = JSON.parse(localStorage.getItem("reservasAUTOCARS")) || [];

        // Limpiamos el tbody por seguridad
        tbody.innerHTML = "";

        // Recorremos cada reserva guardada y creamos una fila <tr> por cada una
        listaReservas.forEach(function(reserva, indice) {
            let fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.correo}</td>
                <td>${reserva.celular}</td>
                <td>${reserva.placa}</td>
                <td>${reserva.marca}</td>
                <td>${reserva.modelo}</td>
                <td>${reserva.servicio}</td>
                <td>${reserva.kilometraje}</td>
                <td>${reserva.estado}</td>
                <td class="acciones-celda">
                    <button type="button" class="btn-estado" data-index="${indice}">Entregado</button>
                    <button type="button" class="btn-modificar" data-index="${indice}">Modificar</button>
                    <button type="button" class="btn-eliminar" data-index="${indice}">Eliminar</button>
                </td>
            `;

            tbody.appendChild(fila);
        });
    }

    //BOTONES DE ACCIONES
    // para ver los clics dentro de la tabla
    tbody.addEventListener("click", function(e) {
        //BTN EL ESTADO
        // si hicieron clic en el botón verde
        if (e.target.classList.contains("btn-estado")) {
            const indice = e.target.getAttribute("data-index");
            let listaReservas = JSON.parse(localStorage.getItem("reservasAUTOCARS")) || [];

            // Cambiamos el estado en el objeto específico
            listaReservas[indice].estado = "Entregado";

            // se cuarda el cambio
            localStorage.setItem("reservasAUTOCARS", JSON.stringify(listaReservas));
            cargarTabla();
        }

        // BTN ELIMINAR
        if (e.target.classList.contains("btn-eliminar")) {
            const confirmacion = confirm("⚠️ ¿Estás seguro de que deseas eliminar esta reserva?");

            if (confirmacion) {
                const indice = e.target.getAttribute("data-index");
                let listaReservas = JSON.parse(localStorage.getItem("reservasAUTOCARS")) || [];

                // borramos el array
                listaReservas.splice(indice, 1);

                // cargamos el array nuevo
                localStorage.setItem("reservasAUTOCARS", JSON.stringify(listaReservas));

                cargarTabla();
            }
        }

        // BTN MODIFICAR
        if (e.target.classList.contains("btn-modificar")) {
                const indice = e.target.getAttribute("data-index");
                localStorage.setItem("indiceEdicion", indice);
                window.location.href = "modificar.html"; // Asegúrate que tu archivo se llame así
        }

    });

    // Cargamos la tabla al abrir la página
    cargarTabla();

});

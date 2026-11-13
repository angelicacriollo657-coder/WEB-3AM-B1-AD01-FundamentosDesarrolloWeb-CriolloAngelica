document.addEventListener("DOMContentLoaded", function() {
    cargarHistorial();
});

function cargarHistorial() {
    const tbody = document.getElementById("tablaHistorialBody");
    
    if (!tbody) return;

    tbody.innerHTML = "";
    const reservas = JSON.parse(localStorage.getItem("reservasAUTOCARS")) || [];

    if (reservas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 20px;">No hay reservaciones registradas todavía.</td></tr>`;
        return;
    }

    reservas.forEach((reserva) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${reserva.placa}</td>
            <td>${reserva.marca}</td>
            <td>${reserva.modelo}</td>
            <td>${reserva.servicio}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.hora}</td>
        `;
        tbody.appendChild(fila);
    });
}
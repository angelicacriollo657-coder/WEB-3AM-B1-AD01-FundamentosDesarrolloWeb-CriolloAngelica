document.addEventListener("DOMContentLoaded", function() {
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function() {
            localStorage.removeItem("sesionIniciada");
            localStorage.removeItem("tipoUsuario");

            alert("¡Sesión cerrada con éxito!");
            
            window.location.href = "index.html";
        });
    }
});
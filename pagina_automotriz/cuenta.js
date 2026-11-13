const formulario = document.getElementById('formulario');
const btnIniciar = document.querySelector('.btn-iniciar');
const txtUsuario=document.getElementById('usuario');
const messageUsuario=document.getElementById('errorUsuario')

if (btnIniciar) {
    btnIniciar.addEventListener('click', function() {
        const usuarioInput = document.getElementById('usuario').value.trim();
        const contraInput = document.getElementById('contra').value.trim();

        if (usuarioInput === 'Administrador' && contraInput === 'admin.123') {
            localStorage.setItem('usuarioLogueado', 'admin');
            alert('¡Bienvenido Administrador!');
            window.location.href = 'index.html';
            
        } else if (usuarioInput === 'Angelica' && contraInput === 'ange') {
            localStorage.setItem('usuarioLogueado', 'cliente');
            alert('¡Bienvenido de nuevo, Ange!');
            window.location.href = 'index.html';
            
        } else {
            alert('⚠️ Credenciales incorrectas. Revisa los datos de usuario.');
        }
    });
}

//control dinámico
window.addEventListener('DOMContentLoaded', function() {
        const rol = localStorage.getItem('usuarioLogueado');
        
        const menuMisReservas = document.getElementById('menu-mis-reservas');
        const menuMiPerfil = document.getElementById('menu-mi-perfilu');
        const menuMiPerfilA = document.getElementById('menu-mi-perfila');
        const menuAdmin = document.getElementById('menu-admin');

        if (rol === 'cliente') {
            // Si es usuario normal, mostramos op mis reservas
            if (menuMisReservas) menuMisReservas.style.display = 'block';
            if (menuMiPerfil) menuMiPerfil.style.display = 'block';
            if (menuAdmin) menuAdmin.style.display = 'none';
            
        } else if (rol === 'admin') {
            // Si es administrador, mostramos administrador
            if (menuMisReservas) menuMisReservas.style.display = 'none';
            if (menuAdmin) menuAdmin.style.display = 'block';
            if (menuMiPerfilA) menuMiPerfilA.style.display = 'block';
        } else {
            // Si nadie ha iniciado sesión, ambos se quedan ocultos
            if (menuMisReservas) menuMisReservas.style.display = 'none';
            if (menuMiPerfil) menuMiPerfil.style.display = 'none';
            if (menuAdmin) menuAdmin.style.display = 'none';
            if (menuMiPerfilA) menuMiPerfilA.style.display = 'none';
        }
    });

//validacion
txtUsuario.addEventListener("input", function (e) {
    let valorActual=txtUsuario.value;
    // [^...] todo lo que no sea lo siguiente
    //let letras=valorActual.replace (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    //txtNombre.value=letras;

    let regex=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (regex.test(valorActual)) {
        // si cumple ocultamos el mensaje
        errorUsuario.style.display="none";
    }else{
        //sino indica el mensaje de advertencia
        errorUsuario.style.display="block"
        //limpia el texto borrando lo que no sea letra
        txtUsuario.value=valorActual.replace (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }
    
});
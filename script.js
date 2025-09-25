window.onload = function () {
  alert("Bienvenida al Panel de Usuario");
};

let objetoEjemplo = {
  nombre: "Cristal",
  correo: "cristal@example.com",
  telefono: "12345678"
};

let historial = [];
let contadorAcciones = 1;

function toggleModoOscuro() {
  const body = document.body;
  const toggle = document.getElementById("modoOscuroToggle");

  if (toggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

function actualizarNombre() {
  const nuevoNombre = document.getElementById("inputTexto").value.trim();
  if (nuevoNombre !== "") {
    objetoEjemplo.nombre = nuevoNombre;
    document.getElementById("nombreUsuario").textContent = nuevoNombre;
    mostrarMensaje(`Nombre actualizado a "${nuevoNombre}"`);
    registrarAccion("Actualizar Nombre", `Nuevo nombre: ${nuevoNombre}`);
  } else {
    mostrarMensaje("Por favor ingresa un nombre válido.");
  }
}
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function actualizarCorreo() {
  const nuevoCorreo = prompt("Ingresa nuevo correo:");
  if (validarCorreo(nuevoCorreo)) {
    objetoEjemplo.correo = nuevoCorreo;
    document.getElementById("correoUsuario").textContent = nuevoCorreo;
    mostrarMensaje("Correo actualizado correctamente.");
    registrarAccion("Actualizar Correo", `Nuevo correo: ${nuevoCorreo}`);
  }
}
function actualizarTelefono() {
  const nuevoTelefono = prompt("Ingresa nuevo número de teléfono:");
  const soloNumeros = /^\d{8,15}$/;

  if (soloNumeros.test(nuevoTelefono)) {
    objetoEjemplo.telefono = nuevoTelefono;
    document.getElementById("telefonoUsuario").textContent = nuevoTelefono;
    mostrarMensaje("Teléfono actualizado correctamente.");
    registrarAccion("Actualizar Teléfono", `Nuevo teléfono: ${nuevoTelefono}`);
  } else {
    mostrarMensaje("Número inválido. Debe contener solo dígitos (8 a 15 caracteres).");
    registrarAccion("Error de Validación", "Teléfono ingresado no válido");
  }
}

function mostrarObjeto() {
  const panel = document.getElementById("container");
  panel.innerHTML = `
    <p><strong>Nombre:</strong> ${objetoEjemplo.nombre}</p>
    <p><strong>Correo:</strong> ${objetoEjemplo.correo || "No disponible"}</p>
    <p><strong>Teléfono:</strong> ${objetoEjemplo.telefono || "No disponible"}</p>
  `;
  registrarAccion("Mostrar Datos", "Visualización del objeto usuario");
}

function eliminarPropiedad(obj) {
  delete obj.telefono;
  document.getElementById("telefonoUsuario").textContent = "No disponible";
  mostrarMensaje("Teléfono eliminado correctamente.");
  registrarAccion("Eliminar Teléfono", "Propiedad 'telefono' eliminada");
}

function manejoExcepciones() {
  try {
    metodoInexistente(); // Provoca error
  } catch (error) {
    mostrarMensaje("Error capturado: " + error.message);
    registrarAccion("Try Catch", "Error capturado: " + error.message);
  }
}

function mostrarMensaje(texto) {
  const panel = document.getElementById("container");
  panel.innerHTML = `<p>${texto}</p>`;
}

function registrarAccion(accion, detalle) {
  const tabla = document.getElementById("tablaHistorial");
  const fila = document.createElement("tr");
  const hora = new Date().toLocaleTimeString();

  fila.innerHTML = `
    <td>${contadorAcciones}</td>
    <td>${accion}</td>
    <td>${detalle}</td>
    <td>${hora}</td>
  `;

  tabla.appendChild(fila);
  contadorAcciones++;
}
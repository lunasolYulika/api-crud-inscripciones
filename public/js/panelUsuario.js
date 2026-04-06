// ===============================
// REFERENCIAS A BOTONES
// ===============================
const btnAltaUsuario = document.getElementById('btnAltaUsuario');
const btnListarUsuarios = document.getElementById('btnListarUsuarios');
const btnBuscarUsuario = document.getElementById('btnBuscarUsuario');
const btnActualizarUsuario = document.getElementById('btnActualizarUsuario');
const btnEliminarUsuario = document.getElementById('btnEliminarUsuario');
const tablaUsuarios = document.getElementById('tablaUsuarios');
const btnInicio = document.getElementById('btn-home');

btnInicio.addEventListener('click',  () => {
    window.location.href = 'index.html';
  });
// ===============================
// ALTA USUARIO
// POST /api/usuarios
// ===============================
btnAltaUsuario.addEventListener('click', async () => {

  //const dniInput = prompt('Ingrese DNI:');
  const dni = prompt('Ingrese DNI:').trim(); // no necesito castear a entero, eso es revisado por validator
  //if (!dniInput) return;

  //const dni = Number(dniInput);
  /*
  if (isNaN(dni)) {
    alert('El DNI debe ser numérico');
    return;
  }*/

  const nombre = prompt('Ingrese nombre:');
  //if (!nombre) return;

  const usuario = { dni, nombre };

  try {
    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    if (!res.ok) {
      const err = await res.json();     
      const mensaje = err.error || err.errores?.map(e => e.msg).join('\n') || 'Error';
      throw new Error(mensaje);
    }
  /*  if (!res.ok) {
      const err = await res.json();
      //throw new Error(err.error);
      const mensaje = err.error || err.errores?.map(e => e.msg).join('\n') || 'Error';
      throw new Error(mensaje);

    }*/

    const creado = await res.json();
    alert(`Usuario creado\nID: ${creado._id}`);

  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// ===============================
// LISTAR USUARIOS
// GET /api/usuarios
// ===============================
btnListarUsuarios.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/usuarios');
    const usuarios = await res.json();

    console.clear();
    console.table(
      usuarios.map(u => ({
        ID: u._id,
        DNI: u.dni,
        Nombre: u.nombre
      }))
    );

    // Limpiar tabla
    tablaUsuarios.innerHTML = '';

    // Crear filas
    usuarios.forEach(u => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${u._id}</td>
        <td>${u.dni}</td>
        <td>${u.nombre}</td>
      `;

      tablaUsuarios.appendChild(tr);
    });


  } catch {
    alert('Error al listar usuarios');
  }
});

// ===============================
// BUSCAR USUARIO POR ID
// GET /api/usuarios/:id
// ===============================
btnBuscarUsuario.addEventListener('click', async () => {
  const id = prompt('Ingrese ID del usuario:');
  if (!id) return;

  try {
    const res = await fetch(`/api/usuarios/${id}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    const u = await res.json();
    alert(`Usuario encontrado:\nDNI: ${u.dni}\nNombre: ${u.nombre}`);

  } catch (error) {
    alert(error.message);
  }
});

// ===============================
// ACTUALIZAR USUARIO
// PUT /api/usuarios/:id
// ===============================
btnActualizarUsuario.addEventListener('click', async () => {
  const id = prompt('Ingrese ID del usuario a actualizar:');
  if (!id) return;

  const nombre = prompt('Nuevo nombre:');
  if (!nombre) return;

  try {
    const res = await fetch(`/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    const actualizado = await res.json();
    alert(`Usuario actualizado:\n${actualizado.nombre}`);

  } catch (error) {
    alert(error.message);
  }
});

// ===============================
// ELIMINAR USUARIO
// DELETE /api/usuarios/:id
// ===============================
btnEliminarUsuario.addEventListener('click', async () => {
  const id = prompt('Ingrese ID del usuario a eliminar:');
  if (!id) return;

  const confirmar = confirm('¿Seguro que desea eliminar este usuario?');
  if (!confirmar) return;

  try {
    const res = await fetch(`/api/usuarios/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    alert('Usuario eliminado correctamente');

  } catch (error) {
    alert(error.message);
  }
});

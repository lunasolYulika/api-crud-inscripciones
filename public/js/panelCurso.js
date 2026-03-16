// ===============================
// REFERENCIAS A BOTONES
// ===============================
const btnAlta = document.getElementById('btnAlta');
const btnListar = document.getElementById('btnListar');
const btnBuscar = document.getElementById('btnBuscar');
const btnActualizar= document.getElementById('btnActualizar');
const btnEliminar = document.getElementById('btnEliminar');
const tabla = document.getElementById('tabla');
const btnInicio = document.getElementById('btn-home');

btnInicio.addEventListener('click',  () => {
    window.location.href = 'index.html';
  });
// ===============================
// ALTA USUARIO
// POST /api/usuarios
// ===============================
btnAlta.addEventListener('click', async () => {

  const curso = prompt('Ingrese nombre de curso:');
  if (!curso) return;
  const cupo = prompt('Ingrese el cupo máxmio:');
  if (!cupo) return;

  const cupoMax = Number(cupo);
  if (isNaN(cupoMax)) {
    alert('El cupo debe ser numérico');
    return;
  }

  const cursoAlta = { curso, cupoMax };

  try {
    const res = await fetch('/api/cursos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cursoAlta)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    const cursoCreado = await res.json();
    alert(`Curso creado\nID: ${cursoCreado._id}`);

  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// ===============================
// LISTAR USUARIOS
// GET /api/usuarios
// ===============================
btnListar.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/cursos');
    const cursos = await res.json();
    // Limpiar tabla
    tabla.innerHTML = '';
    // Crear filas
    cursos.forEach(u => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${u._id}</td>
        <td>${u.curso}</td>
        <td>${u.cupoMax}</td>
      `;

      tabla.appendChild(tr);
    });

  
  } catch {
    alert('Error al listar cursos');
  }
});

// ===============================
// BUSCAR USUARIO POR ID
// GET /api/usuarios/:id
// ===============================
btnBuscar.addEventListener('click', async () => {
  const id = prompt('Ingrese ID del curso:');
  if (!id) return;

  try {
    const res = await fetch(`/api/cursos/${id}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    const curso = await res.json();
    alert(`Curso encontrado:\nNombre ${curso.dni}\Cupo Max: ${curso.cupoMax}`);

  } catch (error) {
    alert(error.message);
  }
});

// ===============================
// ACTUALIZAR USUARIO
// PUT /api/usuarios/:id
// ===============================
btnActualizar.addEventListener('click', async () => {
  const id = prompt('Ingrese ID del curso a actualizar:');
  if (!id) return;

  const curso = prompt('Nuevo nombre:');
  if (!curso) return;

  try {
    const res = await fetch(`/api/cursos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ curso })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    const actualizado = await res.json();
    alert(`curso actualizado:\n${actualizado.curso}`);

  } catch (error) {
    alert(error.message);
  }
});

// ===============================
// ELIMINAR USUARIO
// DELETE /api/usuarios/:id
// ===============================
btnEliminar.addEventListener('click', async () => {
  const id = prompt('Ingrese ID del curso a eliminar:');
  if (!id) return;

  const confirmar = confirm('¿Seguro que desea eliminar este curso?');
  if (!confirmar) return;

  try {
    const res = await fetch(`/api/cursos/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    alert('curso eliminado correctamente');

  } catch (error) {
    alert(error.message);
  }
});

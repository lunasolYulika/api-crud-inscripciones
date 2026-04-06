// ===============================
// REFERENCIAS A BOTONES
// ===============================
const btnAlta = document.getElementById('btnAlta');
const btnListarTodos = document.getElementById('btnListarTodos');
const btnBuscar = document.getElementById('btnBuscar');
const btnEliminar = document.getElementById('btnEliminar');
const tabla = document.getElementById('tabla');
const btnListarInscrCurso = document.getElementById('btnListarInscrCurso');
const btnInicio = document.getElementById('btn-home');
const btnBuscarInscr = document.getElementById("btn-insc-curso");
const tablaInscriptos = document.getElementById("tablaInscriptos");
const inscriptosContainer = document.getElementById("inscriptos-container");
const cursoSelect = document.getElementById("cursoId");
const inscripcionessContainer = document.getElementById("inscripciones-container");

document.addEventListener('DOMContentLoaded', async () => {
  const cursosContainer = document.getElementById('cursos-container');

  btnListarInscrCurso.addEventListener('click', async () => {
    cursosContainer.style.display = 'block';
    inscriptosContainer.style.display = 'block';
    inscripcionessContainer.style.display = 'none';
  });

  btnAlta.addEventListener('click', () => {
    cursosContainer.style.display = 'none';
    inscriptosContainer.style.display = 'none';
  });
  btnBuscar.addEventListener('click', () => {
    cursosContainer.style.display = 'none';
    inscriptosContainer.style.display = 'none';
  });
  btnListarTodos.addEventListener('click', () => {
    cursosContainer.style.display = 'none';
    inscriptosContainer.style.display = 'none';
    inscripcionessContainer.style.display = 'block';

  });

  btnEliminar.addEventListener('click', () => {
    cursosContainer.style.display = 'none';
    inscriptosContainer.style.display = 'none';
  });

  const cursoSelect = document.getElementById('cursoId');
  try {
    const response = await fetch('/api/cursos'); // endpoint a listado de cursos
    const cursos = await response.json();

    cursoSelect.innerHTML = '';

    // Agregar una opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Seleccione un curso';
    cursoSelect.appendChild(defaultOption);

    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = curso._id; // ID del curso = valor
      option.text = curso.curso; 
      cursoSelect.appendChild(option);
    });

  } catch (error) {
    console.error('Error al cargar los cursos:', error);
    alert('Error al cargar los cursos.');
  }
});

btnInicio.addEventListener('click', () => {
  window.location.href = 'index.html';
});
//--------------------------------------------------------------------------------------------
// ALTA inscr
btnAlta.addEventListener('click', async () => {
  const usuario = prompt('Ingrese id alumno:');
  //if (!usuarioId) return;
  const curso = prompt('Ingrese el id del curso:');
  //if (!cursoId) return;

  const inscripcion = { usuario, curso }; // mismo nombre q el validador, q a su vez toma nombre de modelo

  try {
    const res = await fetch('/api/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inscripcion)
    });

    if (!res.ok) {
      const err = await res.json();
      const mensaje = err.mensaje || err.errores?.map(e=>e.msg).join('\n') || "Error";
      throw new Error(mensaje);
    }

    const inscrCreado = await res.json();
    alert(`Inscripción completada\nID: ${inscrCreado._id}`);

  } catch (error) {
    alert('Error: ' + error.message);
  }
});
//--------------------------------------------------------------------------------------------
// LISTAR TODAS INSCR
btnListarTodos.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/inscripciones');
    const inscripciones =  await res.json();
    tabla.innerHTML = '';
    
    // Crear filas
    inscripciones.forEach(inscr => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${inscr._id}</td>
          <td>${inscr.curso?.curso || 'Sin curso'}</td>
          <td>${inscr.usuario?.nombre || 'Sin usuario'}</td>
          <td>${new Date(inscr.fechaInscripcion).toLocaleDateString()}</td>
        `;
        tabla.appendChild(tr);
      });
  } catch (error) {
    alert('Error al listar inscriptos: ' + error.message);
  }
});
//--------------------------------------------------------------------------------------------
// BUSCAR UNA INSCR
btnBuscar.addEventListener('click', async () => {
  const id = prompt('Ingrese ID de la inscripción:');
  if (!id) return;
  try {
    const res = await fetch(`/api/inscripciones/${id}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    const inscripcion = await res.json();
    alert(`Inscripción al curso "${inscripcion.curso?.curso || 'Sin curso'}" para alumno "${inscripcion.usuario?.nombre || 'Sin usuario'}"`);
  } catch (error) {
    alert('Error: ' + error.message);
  }
}); 
//--------------------------------------------------------------------------------------------
// BUSCAR INSCR POR CURSO
btnBuscarInscr.addEventListener("click", async()=>{
    const cursoId = cursoSelect.value; // Obtener el ID del curso seleccionado
    if (!cursoId) {
      alert('Por favor, selecciona un curso');
      return;
    }
     try {
        const response = await fetch(`/api/inscripciones/curso/${cursoId}`); 
        if (!response.ok) {
          throw new Error('Server: Error al cargar los inscriptos');
        }
        const usuarios = await response.json();
        // Limpiar la tabla
        tablaInscriptos.innerHTML = '';

        if (usuarios.length === 0) {
          const tr = document.createElement('tr');
          tr.innerHTML = '<td colspan="4">No hay usuarios inscriptos en este curso</td>';
          tablaInscriptos.appendChild(tr);
          return;
        }
        //<td>${new Date(usuario.fechaInscripcion).toLocaleDateString()}</td>
        // Crear filas para la tabla
        usuarios.forEach(usuario => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${usuario._id}</td>
            <td>${usuario.nombre || 'Sin nombre'}</td>
            <td>${usuario.dni || 'Sin DNI'}</td>
            
          `;
          tablaInscriptos.appendChild(tr);
        });
  } catch (error) {
    console.error('Error al cargar los inscriptos:', error);
    alert('Error al cargar los inscriptos: ' + error.message);
  }
});

// ELIMINAR 
btnEliminar.addEventListener('click', async () => {
  const id = prompt('Ingrese ID de la inscripción a eliminar:');
  if (!id) return;

  const confirmar = confirm('¿Seguro que desea eliminar esta inscripción?');
  if (!confirmar) return;

  try {
    const res = await fetch(`/api/inscripciones/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    alert('inscripción eliminada correctamente');

  } catch (error) {
    alert(error.message);
  }
});
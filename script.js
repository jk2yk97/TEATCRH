document.addEventListener('DOMContentLoaded', function() {
  const materias = document.querySelectorAll('.materia');
  materias.forEach(materia => {
    if (localStorage.getItem(materia.id) {
      materia.classList.add('aprobada');
    }
  });

  verificarDependencias();
});


function aprobarMateria(materiaId) {
  localStorage.setItem(materiaId, 'aprobada');
  document.getElementById(materiaId).classList.add('aprobada');
  verificarDependencias();
}

function verificarDependencias() {

  if (!localStorage.getItem('english-a1')) {
    document.getElementById('english-a2').classList.add('bloqueada');
  } else {
    document.getElementById('english-a2').classList.remove('bloqueada');
  }

  if (!localStorage.getItem('facturacion1')) {
    document.getElementById('facturacion2').classList.add('bloqueada');
  } else {
    document.getElementById('facturacion2').classList.remove('bloqueada');
  }

  const materiasSemestre1 = [
    'english-a1', 'atencion-telefonica', 'reservacion', 
    'facturacion1', 'historia', 'orientacion', 'cambio-climatico'
  ];
  const semestre1Completo = materiasSemestre1.every(materia => 
    localStorage.getItem(materia)
  );

  if (semestre1Completo) {
    document.getElementById('semestre2').style.display = 'block';
  } else {
    document.getElementById('semestre2').style.display = 'none';
  }

  const materiasSemestre2 = [
    'english-a2', 'facturacion2', 'gestion-recepcion', 'ofimatica'
  ];
  const semestre2Completo = materiasSemestre2.every(materia => 
    localStorage.getItem(materia)
  );

  if (semestre2Completo) {
    document.getElementById('practicas').style.display = 'block';
  } else {
    document.getElementById('practicas').style.display = 'none';
  }
}

function resetearProgreso() {
  localStorage.clear();
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  cargarProgreso();

  document.getElementById('reset-btn').addEventListener('click', resetearProgreso);
});

function cargarProgreso() {
  document.querySelectorAll('.materia').forEach(materia => {
    if (localStorage.getItem(materia.id)) {
      materia.classList.add('aprobada');
      const btn = materia.querySelector('button');
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Aprobada';
      btn.style.background = '#4CAF50';
    }
  });

  actualizarProgreso();
}

function actualizarProgreso() {
  const englishA1 = localStorage.getItem('english-a1');
  const englishA2 = document.getElementById('english-a2');
  
  if (englishA1) {
    englishA2.classList.remove('bloqueada');
    const btn = englishA2.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i> Marcar como aprobada';
    btn.style.background = 'var(--rosa-fuerte)';
  }

  const facturacion1 = localStorage.getItem('facturacion1');
  const facturacion2 = document.getElementById('facturacion2');
  
  if (facturacion1) {
    facturacion2.classList.remove('bloqueada');
    const btn = facturacion2.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i> Marcar como aprobada';
    btn.style.background = 'var(--rosa-fuerte)';
  }

  const materiasSem1 = [
    'english-a1', 'atencion-telefonica', 'reservacion', 
    'facturacion1', 'historia', 'orientacion', 'cambio-climatico'
  ];
  const aprobadasSem1 = materiasSem1.filter(m => localStorage.getItem(m)).length;
  const porcentajeSem1 = (aprobadasSem1 / materiasSem1.length) * 100;
  
  document.getElementById('progress-sem1').style.width = `${porcentajeSem1}%`;
  document.getElementById('contador-sem1').textContent = `${aprobadasSem1}/${materiasSem1.length}`;

  if (aprobadasSem1 === materiasSem1.length) {
    document.getElementById('semestre2').style.display = 'block';
  }

  const materiasSem2 = ['english-a2', 'facturacion2', 'gestion-recepcion', 'ofimatica'];
  const aprobadasSem2 = materiasSem2.filter(m => localStorage.getItem(m)).length;
  const porcentajeSem2 = (aprobadasSem2 / materiasSem2.length) * 100;
  
  if (document.getElementById('semestre2').style.display === 'block') {
    document.getElementById('progress-sem2').style.width = `${porcentajeSem2}%`;
    document.getElementById('contador-sem2').textContent = `${aprobadasSem2}/${materiasSem2.length}`;
  }

  if (aprobadasSem2 === materiasSem2.length) {
    document.getElementById('practicas').style.display = 'block';
  }
}

function aprobarMateria(materiaId) {
  localStorage.setItem(materiaId, 'true');
  const materia = document.getElementById(materiaId);
  materia.classList.add('aprobada');
  
  const btn = materia.querySelector('button');
  btn.innerHTML = '<i class="fas fa-check-circle"></i> Aprobada';
  btn.style.background = '#4CAF50';
  
  actualizarProgreso();
}

function resetearProgreso() {
  if (confirm('¿Estás seguro de reiniciar todo tu progreso? Se borrarán todas las materias marcadas.')) {
    localStorage.clear();
    location.reload();
  }
}

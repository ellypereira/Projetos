function carregarAgendamentos() {
  const lista = document.getElementById('agendamentos-list');
  lista.innerHTML = '';

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

  if (agendamentos.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhuma consulta agendada.';
    lista.appendChild(li);
    return;
  }

  agendamentos.forEach((agendamento) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Especialidade:</strong> ${agendamento.especialidade}<br>
      <strong>Médico:</strong> ${agendamento.medico}<br>
      <strong>Horário:</strong> ${agendamento.horario}
    `;
    lista.appendChild(li);
  });
  
}
function logout() {
  // Remove os dados do usuário e redireciona para a tela de login
  localStorage.removeItem('usuarioLogado'); // ou o nome que você usou para armazenar o login
  window.location.href = 'index.html'; // substitua por sua tela de login real
}


document.addEventListener('DOMContentLoaded', carregarAgendamentos);

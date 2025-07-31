document.addEventListener("DOMContentLoaded", () => {
  const filtroMedico = document.getElementById("filtro-medico");
  const lista = document.getElementById("lista-agendamentos");

  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  // Preencher select com todos os médicos (sem duplicar)
  const nomesMedicos = new Set(agendamentos.map(a => a.medico));
  nomesMedicos.forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    opt.textContent = nome;
    filtroMedico.appendChild(opt);
  });

  exibirAgendamentos(agendamentos);
});

function exibirAgendamentos(listaAgendamentos) {
  const lista = document.getElementById("lista-agendamentos");
  lista.innerHTML = "";

  if (listaAgendamentos.length === 0) {
    lista.innerHTML = "<li>Nenhum agendamento encontrado.</li>";
    return;
  }

  listaAgendamentos.forEach(ag => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${ag.medico}</strong><br>
      Paciente: ${ag.paciente}<br>
      Especialidade: ${ag.especialidade}<br>
      Data: ${ag.data} | Horário: ${ag.horario}
    `;
    lista.appendChild(li);
  });
}

function filtrar() {
  const medico = document.getElementById("filtro-medico").value;
  const data = document.getElementById("filtro-data").value;
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  const filtrado = agendamentos.filter(ag => {
    const matchMedico = medico === "" || ag.medico === medico;
    const matchData = data === "" || ag.data === data;
    return matchMedico && matchData;
  });

  exibirAgendamentos(filtrado);
}

function limparFiltros() {
  document.getElementById("filtro-medico").value = "";
  document.getElementById("filtro-data").value = "";
  filtrar(); // Vai mostrar tudo de novo
}

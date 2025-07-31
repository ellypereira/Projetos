document.addEventListener("DOMContentLoaded", () => {
  const especialidadeSelect = document.getElementById("especialidade");
  const medicoSelect = document.getElementById("medico");
  const horarioSelect = document.getElementById("horario");
  const dataInput = document.getElementById("data");

  // Data mínima é hoje
  const hoje = new Date().toISOString().split("T")[0];
  dataInput.min = hoje;

  // Preenche especialidades
  for (let esp in medicos) {
    const option = document.createElement("option");
    option.value = esp;
    option.textContent = esp;
    especialidadeSelect.appendChild(option);
  }

  // Quando escolhe especialidade
  especialidadeSelect.addEventListener("change", () => {
    const especialidade = especialidadeSelect.value;
    medicoSelect.innerHTML = `<option value="">Selecione</option>`;
    horarioSelect.innerHTML = `<option value="">Selecione um médico</option>`;
    horarioSelect.disabled = true;

    if (especialidade && medicos[especialidade]) {
      medicoSelect.disabled = false;
      medicos[especialidade].forEach((med) => {
        const opt = document.createElement("option");
        opt.value = med.nome;
        opt.textContent = med.nome;
        medicoSelect.appendChild(opt);
      });
    } else {
      medicoSelect.disabled = true;
    }
  });

  // Quando escolhe médico
  medicoSelect.addEventListener("change", () => {
    const especialidade = especialidadeSelect.value;
    const medicoSelecionado = medicoSelect.value;
    const medicoObj = medicos[especialidade].find(m => m.nome === medicoSelecionado);
    const dataSelecionada = dataInput.value;

    horarioSelect.innerHTML = `<option value="">Selecione</option>`;
    horarioSelect.disabled = true;

    if (!medicoObj) return;

    const horariosDisponiveis = [...medicoObj.horarios];

    // Pegar horários já ocupados (se já tem data)
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    if (dataSelecionada) {
      const ocupados = agendamentos
        .filter(a => a.medico === medicoSelecionado && a.data === dataSelecionada)
        .map(a => a.horario);

      const horariosFiltrados = horariosDisponiveis.filter(h => !ocupados.includes(h));

      if (horariosFiltrados.length === 0) {
        horarioSelect.disabled = false;
        const opt = document.createElement("option");
        opt.textContent = "Todos os horários estão ocupados";
        opt.disabled = true;
        horarioSelect.appendChild(opt);
      } else {
        horarioSelect.disabled = false;
        horariosFiltrados.forEach(h => {
          const opt = document.createElement("option");
          opt.value = h;
          opt.textContent = h;
          horarioSelect.appendChild(opt);
        });
      }
    } else {
      horarioSelect.disabled = false;
      horariosDisponiveis.forEach(h => {
        const opt = document.createElement("option");
        opt.value = h;
        opt.textContent = h;
        horarioSelect.appendChild(opt);
      });
    }
  });

  // Atualiza horários ao mudar a data
  dataInput.addEventListener("change", () => {
    medicoSelect.dispatchEvent(new Event("change"));
  });
});

function agendar() {
  const nomePaciente = localStorage.getItem("loggedInUser");
  const especialidade = document.getElementById("especialidade").value;
  const medico = document.getElementById("medico").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  if (!especialidade || !medico || !data || !horario) {
    alert("Preencha todos os campos para agendar.");
    return;
  }

  const novoAgendamento = {
    paciente: nomePaciente,
    especialidade,
    medico,
    data,
    horario
  };

  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  agendamentos.push(novoAgendamento);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

  alert("Agendamento confirmado!");
  window.location.href = "home.html";
}

function voltar() {
  window.location.href = "home.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const nome = localStorage.getItem("loggedInUser");
    const lista = document.getElementById("agendamentos-list");
    const userNameSpan = document.getElementById("user-name");

    if (!nome) {
        window.location.href = "index.html";
        return;
    }

    userNameSpan.textContent = nome;

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    const agendamentosDoUsuario = agendamentos.filter(item => item.paciente === nome);

    if (agendamentosDoUsuario.length === 0) {
        lista.innerHTML = "<li>Nenhum agendamento encontrado.</li>";
    } else {
        agendamentosDoUsuario.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = `${item.especialidade} com Dr(a). ${item.medico} em ${item.data} às ${item.horario}`;
            lista.appendChild(li);
        });
    }
});

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}